import Link from "next/link";

export default function NavBar() {
    return (
        <nav className="border-b border-gray-300">
            <div className="flex p-5 gap-2 items-center justify-between">
                <Link href='/' className="text-[1.2rem] font-bold hover:text-gray-700">TradeBoard</Link>
                <div className="flex gap-3 items-center text-[0.9rem]">
                    <Link href='/' className="border px-5 py-1.5 rounded-xl hover:bg-black hover:text-white">Browse Jobs</Link>
                    <Link href='/new-job' className="border px-5 py-1.5 rounded-xl hover:bg-black hover:text-white">Post a New Job</Link>
                </div>
            </div>
        </nav>
    );
}

//maleeshaprabash9_db_user
//oSv0t0FHGmP8HLzm