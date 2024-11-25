import DashboardCard from '@/components/dashboard/DashboardCard';
// import { dashboardCards } from "@/constants/student"
import Image from 'next/image';
import pageBalance from '@/public/assets/pagebalance.svg';
import pagePrinted from '@/public/assets/pageprinted.svg';
import trendUp from '@/public/assets/trend_up.svg';
import trendDown from '@/public/assets/trend_down.svg';

export default function Home() {
    return (
        <div className="flex flex-col gap-2">
            <div>
                <p className="text-2xl font-bold">Dashboard</p>
            </div>
            {/* <div className="flex flex-wrap justify-evenly gap-4 p-4">
                {dashboardCards.map((card) => (
                    <DashboardCard key={card.label} {...card} trend={card.trend as "up" | "down"} />
                ))}
            </div> */}
            <div className='flex my-[16px]'>
                <div className='relative p-[16px] mr-[32px] bg-white w-[250px] h-[140px] [box-shadow:6px_6px_54px_rgba(0,_0,_0,_0.05)] rounded-[14px]'>
                    <div className='flex'>
                        <div>
                            <h2 className='text-[16px] text-[#636466]'>Page Balance</h2>
                            <h3 className='text-[28px] font-semibold'>365</h3>
                        </div>
                        <Image className='absolute right-[16px]'
                            src={pageBalance} alt='pageBalance' width={50}></Image>
                    </div>
                    <div className='flex absolute bottom-[16px]'>
                        <Image className='mr-[4px]' src={trendUp} alt='trendUp'></Image>
                        <span className='text-[14px] text-[#636466]'>
                            <span className='text-[#00B69B]'>+15 </span>
                            pages from SPSO</span>
                    </div>
                </div>
                <div className='relative p-[16px] mr-[32px] bg-white w-[250px] h-[140px] [box-shadow:6px_6px_54px_rgba(0,_0,_0,_0.05)] rounded-[14px]'>
                    <div className='flex'>
                        <div>
                            <h2 className='text-[16px] text-[#636466]'>Total Pages Printed</h2>
                            <h3 className='text-[28px] font-semibold'>293</h3>
                        </div>
                        <Image className='absolute right-[16px]'
                            src={pagePrinted} alt='pageBalance' width={50}></Image>
                    </div>
                    <div className='flex absolute bottom-[16px]'>
                        <Image className='mr-[4px]' src={trendDown} alt='trendDown'></Image>
                        <span className='text-[14px] text-[#636466]'>
                            <span className='text-[#F93C65]'>4,3% </span>
                            down from yesterday</span>
                    </div>
                </div>
            </div>
        </div>

    );
}
