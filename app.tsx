"use client";

import { useState } from "react";

export default function Home() {
  const [content, setContent] = useState("");
  const [ttl, setTtl] = useState("");
  const [views, setViews] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function submit() {
    setError(null);
    setResult(null);

    const res = await fetch("/api/pastes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content,
        ttl_seconds: ttl ? Number(ttl) : undefined,
        max_views: views ? Number(views) : undefined
      })
    });

    const data = await res.json();
    if (!res.ok) {
      setError(data.error);
    } else {
      setResult(data.url);
    }
  }

  return (
    <main style={{ padding: 20 }}>
      <h1>Pastebin Lite</h1>

      <textarea
        rows={6}
        style={{ width: "100%" }}
        placeholder="Paste content..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <input
        placeholder="TTL (seconds)"
        value={ttl}
        onChange={(e) => setTtl(e.target.value)}
      />

      <input
        placeholder="Max Views"
        value={views}
        onChange={(e) => setViews(e.target.value)}
      />

      <br />
      <button onClick={submit}>Create Paste</button>

      {result && <p>Share URL: <a href={result}>{result}</a></p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </main>
  );
}
