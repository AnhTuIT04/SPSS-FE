import { auth } from '@/auth';

import BuyPage from './printPage'

export default async function Buy() {
    const session = await auth();

    if (!session?.user) {
        return <p>Unauthorized</p>
    }
    return <BuyPage user={session.user} />
}
