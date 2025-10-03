import { Calendar, CalendarDays, TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card"
import type { ChartConfig } from "../ui/chart"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../../components/ui/chart"

export const description = "A bar chart"

const chartData = [
  { month: "Sunday", desktop: 68500 },
  { month: "Monday", desktop: 33260},
  { month: "Tuesday", desktop: 45000 },
  { month: "Wednesday", desktop: 69800 },
  { month: "Thursday", desktop: 75400 },
  { month: "Friday", desktop: 90000 },
  { month: "Saturday", desktop: 21400 },
]

const chartConfig = {
  desktop: {
    label: "Rupees",
    color: "#f97316", // Orange-500
  },
} satisfies ChartConfig

export function ChartBarDefault() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Sales Chart</CardTitle>
        <CardDescription>Sales from Sunday to Saturday</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
            Processed data upto date <Calendar className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing daily sales for the past 7 days
        </div>
      </CardFooter>
    </Card>
  )
}
