import { SaveIcon, SearchIcon, ZapIcon, LockIcon } from "lucide-react";
import * as React from "react";

type Feature = {
  title: string;
  description: string;
  icon: any;
};

const features: Feature[] = [
  {
    title: "One-click save",
    description: "Save pages instantly from your browser with a single click.",
    icon: SaveIcon,
  },
  {
    title: "AI vector search",
    description:
      "Find the most relevant bookmark using natural language queries.",
    icon: SearchIcon,
  },
  {
    title: "Fast retrieval",
    description: "Search returns top matches quickly so you get back to work.",
    icon: ZapIcon,
  },
  {
    title: "Private by default",
    description:
      "Your bookmarks and vectors are stored securely — you control access.",
    icon: LockIcon,
  },
];

export const Features = () => {
  return (
    <section id="features" className="mt-20">
      <h2 className="text-2xl font-semibold text-foreground">Key features</h2>

      <ul className="mt-6 grid gap-6 sm:grid-cols-2">
        {features.map((feature) => (
          <li key={feature.title} className="rounded-lg border p-5">
            <div className="flex items-start gap-4">
              <div className="mt-1 rounded-md text-foreground p-2">
                {(() => {
                  const Icon = feature.icon;
                  return <Icon className="size-5" />;
                })()}
              </div>

              <div>
                <h3 className="font-medium text-foreground">{feature.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};
