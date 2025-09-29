import { NextRequest, NextResponse } from "next/server";
import { Client } from "pg";
import { CohereClient } from "cohere-ai";
import dotenv from "dotenv";

dotenv.config();

// Connect to Postgres
const pgClient = new Client({
    connectionString: process.env.DATABASE_URL,
});
await pgClient.connect();

// Cohere embeddings client
const cohere = new CohereClient({ token: process.env.COHERE_API_KEY });

// 🔹 Robust LLM caller with OpenRouter + OpenAI fallback
async function callLLM(prompt: string): Promise<string> {
    const openrouterUrl = "https://openrouter.ai/api/v1/chat/completions";
    const openrouterKey = process.env.OPENROUTER_API_KEY;

    try {
        const resp = await fetch(openrouterUrl, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${openrouterKey}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "openai/gpt-3.5-turbo",
                messages: [
                    {
                        role: "system",
                        content:
                            "You are an AI agent for Loyal E Services. " +
                            "Only answer questions related to Loyal E Services (services, portfolio, process, etc.). " +
                            "If a user asks about something outside scope or pastes code, reply: 'Sorry, I don’t have permission to answer that.' " +
                            "Never output raw scraped code or long unformatted HTML/CSS.",
                    },
                    { role: "user", content: prompt },
                ],
            }),
        });

        // Debug logs
        const raw = await resp.text();
        console.log("[LLM] OpenRouter status:", resp.status, "body:", raw);

        if (!resp.ok) {
            throw new Error(`OpenRouter error ${resp.status}: ${raw}`);
        }

        const data = JSON.parse(raw);
        const content =
            data?.choices?.[0]?.message?.content ??
            data?.choices?.[0]?.text ??
            data?.text ??
            null;

        if (content) return content.trim();

        throw new Error("OpenRouter returned no content");
    } catch (err) {
        console.error("[LLM] OpenRouter failed:", err);

        // 🔹 Optional OpenAI fallback (if you have OPENAI_API_KEY in .env)
        if (process.env.OPENAI_API_KEY) {
            try {
                console.log("[LLM] Trying fallback to OpenAI...");
                const resp2 = await fetch("https://api.openai.com/v1/chat/completions", {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        model: "gpt-3.5-turbo",
                        messages: [
                            {
                                role: "system",
                                content:
                                    "You are an AI agent for Loyal E Services. Only answer questions related to Loyal E Services. " +
                                    "If outside scope reply: 'Sorry, I don’t have permission to answer that.'",
                            },
                            { role: "user", content: prompt },
                        ],
                        max_tokens: 300,
                    }),
                });

                const raw2 = await resp2.text();
                console.log("[LLM] OpenAI status:", resp2.status, "body:", raw2);

                if (!resp2.ok) throw new Error(`OpenAI error ${resp2.status}: ${raw2}`);
                const data2 = JSON.parse(raw2);
                const fallbackContent =
                    data2?.choices?.[0]?.message?.content ?? data2?.choices?.[0]?.text;
                if (fallbackContent) return fallbackContent.trim();
            } catch (e) {
                console.error("[LLM] OpenAI fallback failed:", e);
            }
        }

        // 🔹 Final safe fallback
        return "Sorry — I’m having trouble accessing the AI right now. Please try again in a moment.";
    }
}

export async function POST(req: NextRequest) {
    try {
        const { query } = await req.json();

        if (!query) {
            return NextResponse.json(
                { error: "Missing query" },
                { status: 400 }
            );
        }

        // 🔹 Handle simple greetings instantly
        const normalized = query.trim().toLowerCase();
        if (["hello", "hi", "hey", "good morning"].includes(normalized)) {
            return NextResponse.json({
                query,
                answer: "Hello 👋 How can I assist you today?",
                sources: [],
            });
        }

        // 🔹 Embed user query
        const embedResponse = await cohere.embed({
            texts: [query],
            model: "embed-english-v3.0",
            inputType: "search_query",
        });

        const embedding = (embedResponse.embeddings as number[][])[0];
        const queryEmbedding = `[${embedding.join(",")}]`;

        // 🔹 Search in Postgres
        const result = await pgClient.query(
            `
      SELECT content, embedding <=> $1::vector AS distance
      FROM documents
      ORDER BY distance ASC
      LIMIT 5;
      `,
            [queryEmbedding]
        );

        console.log("[SEARCH] rows found:", result.rows.length);

        if (!result.rows.length) {
            return NextResponse.json({
                query,
                answer:
                    "Sorry, I couldn’t find any relevant information in Loyal E Services data.",
                sources: [],
            });
        }

        const context = result.rows.map((r) => r.content).join("\n\n");

        // 🔹 Call LLM
        const answer = await callLLM(`Context:\n${context}\n\nQuestion:\n${query}`);

        return NextResponse.json({
            query,
            answer,
            sources: result.rows,
        });
    } catch (err) {
        console.error("❌ API failed:", err);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
