"use client";

import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { ReactNode } from "react";
import { overviewConf } from "@/config/overview";

interface LearnedWordsChartProps {
  description?: string;
  footer?: ReactNode;
  chartData: {
    day: string;
    learned: number;
    new: number;
  }[];
}

const chartConfig = {
  learned: {
    label: "Learned",
    color: overviewConf.learned.icon.hex,
  },
  new: {
    label: "New",
    color: overviewConf.learning.icon.hex,
  },
} satisfies ChartConfig;

export function SevDaysProgressChart({
  description,
  footer,
  chartData,
}: LearnedWordsChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Seven Days Progress Chart</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-36 w-full">
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={true}
              axisLine={true}
              tickMargin={8}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <ChartLegend content={<ChartLegendContent />} />
            <Line
              dataKey="learned"
              type="natural"
              stroke="var(--color-learned)"
              strokeWidth={2}
              dot={true}
            />
            <Line
              dataKey="new"
              type="natural"
              stroke="var(--color-new)"
              strokeWidth={2}
              dot={true}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      {footer && (
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex gap-2 font-medium leading-none">{footer}</div>
        </CardFooter>
      )}
    </Card>
  );
}
