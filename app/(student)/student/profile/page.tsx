import { auth } from '@/auth';

import Profile from './profile'

const Page = async () => {
    const session = await auth();
    const user = session?.user;
    const name = user?.firstName.charAt(0).toUpperCase() + user?.firstName.slice(1) + ' ' + user?.lastName.charAt(0).toUpperCase() + user?.lastName.slice(1);
    user.name = name;

    return (
        <Profile user={user} />
    )
}

export default Page