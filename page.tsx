import { kv } from "@/lib/kv";

export default async function PastePage({ params }: any) {
  const paste = await kv.get<any>(`paste:${params.id}`);

  if (!paste) {
    return <h1>404 – Paste not found</h1>;
  }

  return (
    <main style={{ padding: "20px" }}>
      <h2>Paste</h2>
      <pre style={{ whiteSpace: "pre-wrap", background: "#f4f4f4", padding: "12px" }}>
        {paste.content}
      </pre>
    </main>
  );
}
