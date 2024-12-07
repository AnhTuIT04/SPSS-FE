import { auth } from '@/auth';

import PrintPage from './PrintPage'

export default async function Dashboard() {
  const session = await auth();

  if (!session?.user) {
    return <p>Unauthorized</p>
  }
  return <PrintPage user={session.user} />
}
