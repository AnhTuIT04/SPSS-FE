'use client';

import { TrendingUp } from 'lucide-react';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

const chartConfig = {
  payment: {
    label: 'PaymentLog',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig;

interface AreaChartComponentProps {
  data: { date: string; value: number }[];
}

const AreaChartComponent: React.FC<AreaChartComponentProps> = ({ data }) => {
  return (
    <Card>
      {/* <CardHeader>
        <CardTitle>Payment Log</CardTitle>
      </CardHeader> */}
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full>">
          <AreaChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString();
              }}
            />
            <YAxis
              dataKey="value"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => {
                return value.toString() + ' $';
              }}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
            <Area
              dataKey="value"
              type="natural"
              fill="#2563eb"
              fillOpacity={0.4}
              stroke="#2563eb"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default AreaChartComponent;
