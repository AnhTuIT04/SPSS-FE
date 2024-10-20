import DashboardCard from '@/components/dashboard/DashboardCard';
import { dashboardCards } from '@/constants/spso';
import BarChartAndFilter from '@/components/dashboard/BarChartAndFilter';
import AreaChartAndFilter from '@/components/dashboard/AreaChartAndFilter';
import PrintingLogTable from '@/components/PrintTable/PrintingLogTable';

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

      <div className="w-full flex flex-wrap gap-10">
        <BarChartAndFilter />
        <AreaChartAndFilter />
      </div>

      <PrintingLogTable />
    </div>
  );
}
