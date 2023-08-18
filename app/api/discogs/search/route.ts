import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export const POST = async (req: NextRequest) => {
  try {
    const { query } = await req.json();

    const { data } = await axios.get(
      'https://api.discogs.com/database/search',
      {
        headers: {
          Authorization: `Discogs key=${
            process.env.DISCOGS_CONSUMER_KEY ?? ''
          }, secret=${process.env.DISCOGS_CONSUMER_SECRET ?? ''}`,
        },
        params: {
          q: query,
          type: 'release',
          format: 'vinyl',
          per_page: '20',
        },
      },
    );

    return NextResponse.json({ ...data }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
};
