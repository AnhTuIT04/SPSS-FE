import { auth } from '@/auth';

import DashboardPage from './dashboardPage'

export default async function Dashboard() {
    const session = await auth();

    if (!session?.user) {
        return <p>Unauthorized</p>
    }
    return <DashboardPage user={session.user} />
}
