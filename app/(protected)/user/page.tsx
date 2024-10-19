// app/Dashboard.tsx (Server Component)
import { auth } from '@/auth';
import LogoutButton from './button'; // Import Client Component

export default async function Dashboard() {
  const session = await auth();

  if (session?.user?.role === 'student') {
    return (
      <>
        <p>You are an admin, welcome!</p>
        <LogoutButton />
      </>
    );
  }

  return <p>You are not authorized to view this page!</p>;
}
