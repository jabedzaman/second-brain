import Link from "next/link";
import { Button } from "~/components/ui/button";
import { pc } from "~/lib/pinecone";
import { Graph } from "./_components/graph";
import { Features } from "./_components/features";

export default async function Home() {
  const index = pc.Index("bookmarks");
  const stats = await index.describeIndexStats();
  return (
    <main className="min-h-screen flex items-center">
      <div className="mx-auto w-full max-w-5xl px-6 py-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          <section>
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
              Brain — Your AI-powered bookmark manager
            </h1>

            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              Save anything with one click. Bookmarks are indexed, so you can
              search naturally and get the most relevant result instantly — no
              more losing that cool thing you found.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild>
                <Link href="#" className="inline-flex items-center">
                  Get the extension
                </Link>
              </Button>

              <Button variant="outline" asChild>
                <Link href="#features" className="inline-flex items-center">
                  How it works
                </Link>
              </Button>
            </div>

            <div className="mt-8 text-sm">
              <strong>Why use it?</strong> We all save things we like, but later
              it&apos;s hard to find them. Brain surfaces the most relevant
              bookmark when you need it.
            </div>
          </section>

          <section className="flex items-center justify-center">
            <div className="w-full max-w-md p-1 shadow-lg">
              <div className="p-4">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="h-3 w-3 rounded-full bg-primary" />
                    <span className="text-sm font-medium">Saved</span>
                  </div>
                  <div className="text-xs">just now</div>
                </div>

                <Graph count={stats.totalRecordCount || 0} />

                <div className="mt-4 flex items-center justify-between text-sm">
                  <div>Vector indexed · {stats.totalRecordCount}kb</div>
                  <div className="font-medium">Searchable now</div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <Features />
      </div>
    </main>
  );
}
