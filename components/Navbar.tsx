import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { HiBars3, HiMagnifyingGlass, HiPlus, HiUser } from 'react-icons/hi2';
import Link from 'next/link';

const Navbar = async () => {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <nav className="m-auto mt-10 flex w-fit items-center gap-1 rounded-lg bg-stone-300/60 p-3 backdrop-blur">
      <button className="rounded bg-stone-700 p-3 text-2xl text-white">
        <HiBars3 />
      </button>
      <button className="rounded bg-stone-700 p-3 text-2xl text-white">
        <HiUser />
      </button>

      <div className="mx-1 h-8 w-0.5 rounded-full bg-stone-400"></div>

      <div className="box-content flex gap-2 rounded bg-stone-400 p-3 text-2xl text-white">
        <HiMagnifyingGlass />
        <input
          type="text"
          placeholder="search for a record"
          className="w-64 bg-transparent text-sm font-medium placeholder-stone-200 outline-none"
        />
      </div>
      <Link
        href="/dashboard/records/new/search"
        className="rounded bg-stone-700 p-3 text-2xl text-white"
        title="Add a record"
      >
        <HiPlus />
      </Link>
    </nav>
  );
};

export default Navbar;
