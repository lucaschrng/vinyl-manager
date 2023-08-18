import { NextRequest, NextResponse } from 'next/server';
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';

export const middleware = async (req: NextRequest) => {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (req.nextUrl.pathname.startsWith('/dashboard') && !session) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (req.nextUrl.pathname.startsWith('/login') && session) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  return res;
};
