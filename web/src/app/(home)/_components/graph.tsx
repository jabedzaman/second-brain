"use client";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "~/components/ui/chart";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";

const chartData = [
  { month: "January", bookmarks: 186 },
  { month: "February", bookmarks: 305 },
  { month: "March", bookmarks: 237 },
  { month: "April", bookmarks: 273 },
  { month: "May", bookmarks: 209 },
  { month: "June", bookmarks: 214 },
];

const chartConfig = {
  bookmarks: {
    label: "bookmarks",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export const Graph: React.FC<{ count: number }> = ({ count }) => {
  return (
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

          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px]"
          >
            <RadarChart data={chartData}>
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <PolarAngleAxis dataKey="month" />
              <PolarGrid />
              <Radar
                dataKey="bookmarks"
                fill="var(--color-bookmarks)"
                fillOpacity={0.6}
              />
            </RadarChart>
          </ChartContainer>

          <div className="mt-4 flex items-center justify-between text-sm">
            <div>Vector indexed · {count}kb</div>
            <div className="font-medium">Searchable now</div>
          </div>
        </div>
      </div>
    </section>
  );
};
