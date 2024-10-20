import DashboardCard from '@/components/dashboard/DashboardCard';
import { dashboardCards } from '@/constants/spso';
import BarChartAndFilter from '@/components/dashboard/BarChartAndFilter';
import AreaChartAndFilter from '@/components/dashboard/AreaChartAndFilter';
import PrintingLogTable from '@/components/PrintTable/PrintingLogTable';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PaymentLogTable from '@/components/PaymentTable/PaymentLogTable';

export default function Home() {
  return (
    <div className="flex flex-col gap-2">
      <div>
        <p className="text-3xl font-bold">Dashboard</p>
      </div>

      <div className="flex flex-wrap justify-evenly gap-4 p-4">
        {dashboardCards.map((card) => (
          <DashboardCard key={card.label} {...card} trend={card.trend as 'up' | 'down'} />
        ))}
      </div>

      <Tabs defaultValue="printing" className="w-full">
        <TabsList>
          <TabsTrigger value="printing">Printing</TabsTrigger>
          <TabsTrigger value="payment">Payment</TabsTrigger>
        </TabsList>
        <TabsContent value="printing" className='flex flex-col gap-10'>
          <BarChartAndFilter />
          <PrintingLogTable />
        </TabsContent>
        <TabsContent value="payment" className='flex flex-col gap-10'>
          <AreaChartAndFilter />
          <PaymentLogTable />
        </TabsContent>
      </Tabs>
    </div>
  );
}
