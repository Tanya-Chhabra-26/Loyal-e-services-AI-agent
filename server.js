import express from "express";
import { Pool } from "pg";
import dotenv from "dotenv";
import cors from "cors";
import { CohereClient } from "cohere-ai";
import fetch from "node-fetch"; // ensure installed if using Node <18

dotenv.config();

// PostgreSQL pool
const pool = new Pool({
    host: process.env.PGHOST,
    port: Number(process.env.PGPORT),
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
});

// Cohere client for embeddings
const cohere = new CohereClient({ token: process.env.COHERE_API_KEY || "" });

// 🔹 Robust LLM caller with OpenRouter + OpenAI fallback
async function callLLM(prompt) {
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

        // 🔹 Optional fallback: OpenAI official API
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

const app = express();
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

// 🔹 API endpoint
app.post("/api/ai-agent", async (req, res) => {
    try {
        const { query, k = 5 } = req.body;
        if (!query) return res.status(400).json({ error: "Missing query in request body" });

        // Quick replies for greetings
        const normalized = query.trim().toLowerCase();
        if (["hello", "hi", "hey", "good morning"].includes(normalized)) {
            return res.json({
                answer: "Hello 👋 How can I assist you today?",
                matches: [],
            });
        }

        // 1️⃣ Embed query with Cohere
        const embedRes = await cohere.embed({
            model: "embed-english-v3.0",
            texts: [query],
            inputType: "search_query",
        });

        let queryEmbedding = embedRes.embeddings?.[0];
        if (!queryEmbedding) {
            return res.status(500).json({ error: "Failed to generate embedding" });
        }

        queryEmbedding = Array.isArray(queryEmbedding)
            ? queryEmbedding
            : Array.from(queryEmbedding);
        const vectorString = `[${queryEmbedding.join(",")}]`;

        // 2️⃣ Retrieve from pgvector
        const result = await pool.query(
            `
      SELECT id, content, embedding <=> $1::vector AS distance
      FROM documents
      ORDER BY distance ASC
      LIMIT $2
      `,
            [vectorString, k]
        );

        console.log("[SEARCH] rows found:", result.rows.length);

        if (!result.rows.length) {
            return res.json({
                answer: "Sorry, I couldn’t find any relevant information in Loyal E Services data.",
                matches: [],
            });
        }

        const topDocs = result.rows.map((r) => r.content).join("\n---\n");

        // 3️⃣ Call LLM
        const answer = await callLLM(`Context:\n${topDocs}\n\nQuestion:\n${query}`);

        res.json({ answer, matches: result.rows });
    } catch (err) {
        console.error("❌ Error in /api/ai-agent:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
    console.log(` Server running on http://localhost:${PORT}`)
);
