import Image from 'next/image'
import logo_bachkhoa from '/assets/icons/logo_bachkhoa.svg'

export default function SideBar() {
    return (
        <nav className="flex h-screen w-72 bg-red-100">
            <div className='flex flex-col h-28 w-full justify-center items-center'>
                <div className='flex justify-center items-center gap-4 pt-2'>
                    <Image src={logo_bachkhoa} alt="logo" width={50} height={50} />
                    <span className='text-3xl font-semibold pr-8'><h1 className=''>SPSS</h1></span>
                </div>
                <div className='pt-3'>
                    <span><h3>Smart Printing Service for Students</h3></span>
                </div>
            </div>
            <div></div>
            <div></div>
        </nav>
    )
}