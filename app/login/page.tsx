'use client';

import {
  useSessionContext,
  useSupabaseClient,
} from '@supabase/auth-helpers-react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

const Login = () => {
  const router = useRouter();
  const pathname = usePathname();

  const supabaseClient = useSupabaseClient();
  const { session } = useSessionContext();

  useEffect(() => {
    if (session) router.push('/dashboard');
  }, [session]);

  return (
    <div className="absolute top-0 flex h-screen w-full items-center justify-center">
      <div className="w-full max-w-md rounded-md bg-neutral-50 p-4 pt-12 shadow-basic">
        <h1 className="mb-6 text-center text-3xl font-semibold">
          VinylManager
        </h1>
        <Auth
          supabaseClient={supabaseClient}
          providers={['github', 'google']}
          redirectTo={`${window.location.origin}/login`}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: 'rgba(35,35,35,0.9)',
                  brandAccent: 'rgba(35,35,35)',
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default Login;
