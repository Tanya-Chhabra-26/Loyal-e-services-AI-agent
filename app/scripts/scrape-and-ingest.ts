import dotenv from "dotenv";
import puppeteer from "puppeteer";
import * as cheerio from "cheerio";
import { CohereClient } from "cohere-ai";
import { v4 as uuidv4 } from "uuid";
import { Client } from "pg";

dotenv.config();

const COHERE_API_KEY = process.env.COHERE_API_KEY || "";
if (!COHERE_API_KEY) throw new Error("❌ Missing COHERE_API_KEY in .env");

const pgClient = new Client({
    host: process.env.PGHOST,
    port: Number(process.env.PGPORT),
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
});

const cohere = new CohereClient({ token: COHERE_API_KEY });

// -----------------------------
// Helpers
// -----------------------------
async function scrapeText(url: string): Promise<string> {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "domcontentloaded" });
    const html = await page.content();
    await browser.close();

    const $ = cheerio.load(html);
    const text = $("body").text();
    return text.replace(/\s+/g, " ").trim();
}

function chunkText(text: string, chunkSize = 200): string[] {
    const words = text.split(" ");
    const chunks: string[] = [];
    for (let i = 0; i < words.length; i += chunkSize) {
        chunks.push(words.slice(i, i + chunkSize).join(" "));
    }
    return chunks;
}

async function embedText(text: string): Promise<number[]> {
    const res = await cohere.embed({
        model: "embed-english-v3.0",
        texts: [text],
        inputType: "search_document",
    });

    let embedding = (res as any).embeddings?.[0];
    if (!embedding) {
        throw new Error("❌ Failed to generate embedding");
    }

    // ✅ Ensure plain JS array
    embedding = Array.isArray(embedding) ? embedding : Array.from(embedding);

    return embedding;
}

async function insertEmbedding(id: string, content: string, embedding: number[]) {
    const vectorString = `[${embedding.join(",")}]`; 
    await pgClient.query(
        `
      INSERT INTO documents (id, content, embedding)
      VALUES ($1, $2, $3::vector)
      ON CONFLICT (id) DO NOTHING
    `,
        [id, content, vectorString]
    );
}

// -----------------------------
// Main pipeline
// -----------------------------
async function main() {
    console.log("🔹 Starting ingestion...");
    await pgClient.connect();

    const urls = [
        "https://loyaleservices.com/",
        "https://loyaleservices.com/about",
        "https://loyaleservices.com/services",
        "https://loyaleservices.com/contact",
    ];

    for (const url of urls) {
        console.log(`🌐 Scraping: ${url}`);
        const rawText = await scrapeText(url);
        console.log("✅ Scraped text length:", rawText.length);

        const chunks = chunkText(rawText);
        console.log("✅ Created", chunks.length, "chunks");

        for (const chunk of chunks) {
            try {
                const embedding = await embedText(chunk);
                await insertEmbedding(uuidv4(), chunk, embedding);
                console.log(`✅ Inserted chunk from ${url}`);
            } catch (err) {
                console.error("❌ Failed to embed/insert chunk:", err);
            }
        }
    }

    console.log("🎉 Ingestion complete!");
    await pgClient.end();
}

main().catch((err) => {
    console.error("Fatal error in ingestion script:", err);
    process.exit(1);
});
