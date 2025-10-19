import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart";
import { getLastWeekRange } from "../../lib/getLastWeekRange";
import React, { useMemo } from "react";
import type { GetLastWeekSalesType } from "../../types/ResponseTypes";
import type { ChartConfig } from "../ui/chart";
import { motion } from "framer-motion";
type SellerProductProps = {
  lastWeekSalesReport: GetLastWeekSalesType | null;
  setLastWeekSalesReport: React.Dispatch<
    React.SetStateAction<GetLastWeekSalesType | null>
  >;
};

export function SellerProductSales({
  lastWeekSalesReport,
}: SellerProductProps) {
  // Prepare chart data
  const chartData = useMemo(() => {
    if (!lastWeekSalesReport) return [];

    const colors = ["#4F46E5", "#F59E0B", "#10B981", "#EF4444", "#3B82F6"]; // top 5
    const top5 = lastWeekSalesReport.top5Products.map((item, index) => ({
      productName: item.productName,
      visitors: item.count,
      fill: colors[index % colors.length],
    }));

    const top5Total = top5.reduce((sum, item) => sum + item.visitors, 0);
    const othersCount = lastWeekSalesReport.totalProductsSold - top5Total;

    if (othersCount > 0) {
      top5.push({
        productName: "Others",
        visitors: othersCount,
        fill: "#8B5CF6", // purple
      });
    }

    return top5;
  }, [lastWeekSalesReport]);

  // Prepare dynamic chart config for ChartContainer
  const chartConfig: ChartConfig = useMemo(() => {
    const config: ChartConfig = { visitors: { label: "Visitors" } };
    chartData.forEach((item) => {
      config[item.productName] = {
        label: item.productName,
        color: item.fill,
      };
    });
    return config;
  }, [chartData]);

  const totalVisitors = useMemo(
    () => lastWeekSalesReport?.totalProductsSold ?? 0,
    [lastWeekSalesReport]
  );

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{
        duration: 0.6,
        type: "spring",
        stiffness: 100,
        damping: 10,
      }}
    >
      <Card className="flex flex-col">
        <CardHeader className="flex flex-col justify-center items-center pb-0">
          <CardTitle>Last Week Sales</CardTitle>
          <CardDescription>
            {lastWeekSalesReport?.range || getLastWeekRange()}
          </CardDescription>
        </CardHeader>

        <CardContent className="flex-1 pb-0">
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey="visitors"
                nameKey="productName"
                innerRadius={60}
                strokeWidth={5}
              >
                <Label
                  content={({ viewBox }) => {
                    if (!viewBox || !("cx" in viewBox) || !("cy" in viewBox))
                      return null;
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Products
                        </tspan>
                      </text>
                    );
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        </CardContent>

        <CardFooter className="flex-col gap-2 text-sm">
          <div className="flex items-center gap-2 leading-none font-medium">
            Sales increasing this week <TrendingUp className="h-4 w-4" />
          </div>
          <div className="text-muted-foreground leading-none">
            Showing total sales for the last one week
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
