'use client';

import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';
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
  printLog: {
    label: 'PrintLog',
    color: '#2563eb',
  },
} satisfies ChartConfig;

interface BarChartComponentProps {
  data: { date: string; value: number; filetype: string; printer: string }[];
}

const BarChartComponent: React.FC<BarChartComponentProps> = ({ data }) => {
  return (
      <Card>
        {/* <CardHeader>
          <CardTitle>Printing Log</CardTitle>
        </CardHeader> */}
        <CardContent>
          <ChartContainer config={chartConfig} className="min-h-[200px] w-full>">
            <BarChart accessibilityLayer data={data}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return date.toLocaleDateString();
                }}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="value" fill="#2563eb" radius={4} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
  );
};

export default BarChartComponent;
