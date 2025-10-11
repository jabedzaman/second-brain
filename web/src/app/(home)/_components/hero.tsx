import Link from "next/link";
import { Button } from "~/components/ui/button";

export const Hero = () => {
  return (
    <section>
      <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
        Brain — Your AI-powered bookmark manager
      </h1>

      <p className="mt-6 max-w-xl text-lg text-muted-foreground">
        Save anything with one click. Bookmarks are indexed, so you can search
        naturally and get the most relevant result instantly — no more losing
        that cool thing you found.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <Button asChild>
          <Link href="#" className="inline-flex items-center w-36">
            Get the extension
          </Link>
        </Button>

        <Button variant="outline" asChild>
          <Link href="/app" className="inline-flex items-center w-36">
            Dashboard
          </Link>
        </Button>
      </div>

      <div className="mt-8 text-sm">
        <strong>Why use it?</strong> We all save things we like, but later
        it&apos;s hard to find them. Brain surfaces the most relevant bookmark
        when you need it.
      </div>
    </section>
  );
};
