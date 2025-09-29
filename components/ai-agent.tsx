"use client";
import { useState, useEffect, useRef } from "react";

export default function AIAgent() {
    const [query, setQuery] = useState("");
    const [messages, setMessages] = useState<{ role: string; text: string }[]>([]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    // 👇 Auto scroll when messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, loading]);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!query.trim()) return;

        const userMessage = { role: "user", text: query };
        setMessages((prev) => [...prev, userMessage]);
        setQuery("");
        setLoading(true);

        try {
            const res = await fetch("/api/ai-agent", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ query }),
            });

            const data = await res.json();
            const aiMessage = { role: "assistant", text: data.answer || "No response." };
            setMessages((prev) => [...prev, aiMessage]);
        } catch (err) {
            console.error(err);
            setMessages((prev) => [
                ...prev,
                { role: "assistant", text: "❌ Error getting response." },
            ]);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="fixed bottom-4 right-4 w-[350px] z-50">
            {!open && (
                <button
                    onClick={() => setOpen(true)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-600"
                >
                    Chat AI
                </button>
            )}

            {open && (
                <div className="flex flex-col h-[500px] bg-white border rounded-lg shadow-lg overflow-hidden">
                    <div className="flex justify-between items-center p-2 bg-blue-500 text-white">
                        <h2 className="font-bold">AI Agent</h2>
                        <button onClick={() => setOpen(false)} className="text-xl font-bold">
                            ×
                        </button>
                    </div>

                    <div className="flex-1 p-2 overflow-y-auto flex flex-col gap-2 bg-gray-50">
                        {messages.map((msg, i) => (
                            <div
                                key={i}
                                className={`p-2 rounded-md max-w-[80%] ${msg.role === "user"
                                    ? "bg-blue-200 self-end"
                                    : "bg-gray-200 self-start"
                                    }`}
                            >
                                <strong>{msg.role === "user" ? "You: " : "AI: "}</strong>
                                <span>{msg.text}</span>
                            </div>
                        ))}
                        {loading && <div className="italic text-gray-500">AI is typing...</div>}
                        {/* 👇 Scroll anchor */}
                        <div ref={messagesEndRef} />
                    </div>

                    <form onSubmit={handleSubmit} className="flex border-t p-2 gap-2">
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Ask something..."
                            className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
                        />
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Send
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}
