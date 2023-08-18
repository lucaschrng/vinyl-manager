import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

interface GETProps {
  params: {
    releaseId: string;
  };
}

export const GET = async (
  req: NextRequest,
  { params: { releaseId } }: GETProps,
) => {
  try {
    const { data } = await axios.get(
      `https://api.discogs.com/releases/${releaseId}`,
      {
        headers: {
          Authorization: `Discogs key=${
            process.env.DISCOGS_CONSUMER_KEY ?? ''
          }, secret=${process.env.DISCOGS_CONSUMER_SECRET ?? ''}`,
        },
      },
    );

    return NextResponse.json({ ...data }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
};
