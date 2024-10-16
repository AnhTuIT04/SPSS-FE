import Image from 'next/image';

interface DashboardCardProps {
  imgURL: string;
  label: string;
  statistic: string;
  trend: 'up' | 'down';
  trendValue: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ imgURL, label, statistic, trend, trendValue }) => {
  return (
    <div className="bg-white flex flex-col justify-between w-[270px] h-[160px] border p-4 rounded-lg shadow-lg">
      <div className="flex justify-between w-full">
        <div className="flex flex-col gap-5">
          <p className="text-xs text-gray-500">{label}</p>
          <p className="text-3xl">{statistic}</p>
        </div>
        <div>
          <Image src={imgURL} alt="Total User" width={60} height={60} />
        </div>
      </div>
      {trend === 'up' ? (
        <div className="flex gap-1 w-full">
          <Image
            src={'/assets/trend_up.svg'}
            alt="Trend Up"
            width={24}
            height={24}
          />
          <span className="flex gap-1">
            <p className="text-[#00B69B]">{trendValue}</p>
            <p>Up from yesterday</p>
          </span>
        </div>
      ) : (
        <div className="flex gap-1 w-full">
          <Image
            src={'/assets/trend_down.svg'}
            alt="Trend Down"
            width={24}
            height={24}
          />
          <span className="flex gap-1">
            <p className="text-[#FF5C58]">{trendValue}</p>
            <p className=''>Down from yesterday</p>
          </span>
        </div>
      )}
    </div>
  );
};

export default DashboardCard;
