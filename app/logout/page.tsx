'use client';

import { useEffect } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/navigation';

const Logout = () => {
  const supabaseClient = useSupabaseClient();
  const router = useRouter();

  useEffect(() => {
    const signOut = async () => {
      await supabaseClient.auth.signOut();
      router.push('/login');
    };

    signOut();
  }, [supabaseClient]);

  return <h1>Logout</h1>;
};

export default Logout;
