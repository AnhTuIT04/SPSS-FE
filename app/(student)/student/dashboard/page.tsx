import DashboardCard from "@/components/dashboard/DashboardCard"
import { dashboardCards } from "@/constants"

export default function Home() {
    return (
        <div className="flex flex-col gap-2">
            <div><p className="text-3xl font-bold">Dashboard</p></div>
            {/* <div className="flex flex-wrap justify-evenly gap-4 p-4">
                {dashboardCards.map((card) => (
                    <DashboardCard key={card.label} {...card} trend={card.trend as "up" | "down"} />
                ))}
            </div> */}
        </div>
    )
}