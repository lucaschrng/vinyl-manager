import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async () => {
  const { data } = await axios.post(
    'https://accounts.spotify.com/api/token',
    null,
    {
      params: {
        grant_type: 'client_credentials',
        client_id: process.env.SPOTIFY_CLIENT_ID ?? '',
        client_secret: process.env.SPOTIFY_CLIENT_SECRET ?? '',
      },
    },
  );

  return NextResponse.json({ ...data }, { status: 200 });
};
