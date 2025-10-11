import { pc } from "~/lib/pinecone";
import { Features } from "./_components/features";
import { Graph } from "./_components/graph";
import { Hero } from "./_components/hero";

export default async function Home() {
  const index = pc.Index("bookmarks");
  const stats = await index.describeIndexStats();
  return (
    <main className="min-h-screen flex items-center">
      <div className="mx-auto w-full max-w-5xl px-6 py-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          <Hero />
          <Graph count={stats.totalRecordCount || 0} />
        </div>
        <Features />
      </div>
    </main>
  );
}
