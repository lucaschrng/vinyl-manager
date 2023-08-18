import { NextRequest, NextResponse } from 'next/server';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { v4 as uuidv4 } from 'uuid';
import { Database } from '@/types/supabase';
import { decode } from 'base64-arraybuffer';
import { SupabaseClient } from '@supabase/supabase-js';

interface Track {
  position: string;
  title: string;
  duration: string;
}

export const POST = async (req: NextRequest) => {
  const {
    title,
    releaseDateYear,
    artists,
    genres,
    tracks,
    imageUrl,
    imageFile,
    status,
  } = await req.json();

  try {
    const supabase = createServerComponentClient<Database>({ cookies });
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      throw new Error('Not authenticated');
    }

    const artistIDs = await handleArtists(artists, supabase);
    const genreIDs = await handleGenres(genres, supabase);

    let uploadedImageUrl = imageUrl;
    if (imageFile) {
      const base64 = imageFile.base64.split('base64,')[1];

      const { data, error } = await supabase.storage
        .from('images')
        .upload(`${uuidv4()}-${imageFile.name}`, decode(base64), {
          contentType: imageFile.base64
            .split(';base64,')[0]
            .replace('data:', ''),
        });

      if (error) {
        throw error;
      }

      uploadedImageUrl = data?.path;
    }

    const albumInsertResponse = await supabase
      .from('albums')
      .insert([
        {
          user_id: session.user.id,
          title: title,
          release_date_year: releaseDateYear,
          cover_image: uploadedImageUrl,
          status: status,
        },
      ])
      .select()
      .single();

    if (albumInsertResponse.error) {
      throw albumInsertResponse.error;
    }

    const albumID = albumInsertResponse.data.id;

    const albumArtistsData = artistIDs.map((id, index) => ({
      album_id: albumID,
      artist_id: id,
      order: index + 1,
    }));
    const albumArtistsResponse = await supabase
      .from('album_artists')
      .insert(albumArtistsData);

    if (albumArtistsResponse.error) {
      throw albumArtistsResponse.error;
    }

    const albumGenresData = genreIDs.map((id, index) => ({
      album_id: albumID,
      genre_id: id,
      order: index + 1,
    }));
    const albumGenresResponse = await supabase
      .from('album_genres')
      .insert(albumGenresData);

    if (albumGenresResponse.error) {
      throw albumGenresResponse.error;
    }

    const tracksData = tracks.map((track: Track) => ({
      title: track.title,
      position: track.position,
      duration: track.duration,
      album_id: albumID,
    }));
    const tracksResponse = await supabase.from('tracks').insert(tracksData);

    if (tracksResponse.error) {
      throw tracksResponse.error;
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
};

async function handleArtists(
  artists: string[],
  supabase: SupabaseClient<Database>,
) {
  const artistIds = [];

  for (let artist of artists) {
    let { data, error } = await supabase
      .from('artists')
      .select('id')
      .eq('name', artist)
      .maybeSingle();

    if (error) {
      throw error;
    }

    if (!data) {
      const insertResponse = await supabase
        .from('artists')
        .insert({ name: artist })
        .select()
        .single();

      if (insertResponse.error) {
        throw insertResponse.error;
      }

      artistIds.push(insertResponse.data.id);
    } else {
      artistIds.push(data.id);
    }
  }

  return artistIds;
}

async function handleGenres(
  genres: string[],
  supabase: SupabaseClient<Database>,
) {
  const genreIds = [];

  for (let genre of genres) {
    let { data, error } = await supabase
      .from('genres')
      .select('id')
      .eq('name', genre)
      .maybeSingle();

    if (error) {
      throw error;
    }

    if (!data) {
      const insertResponse = await supabase
        .from('genres')
        .insert({ name: genre })
        .select()
        .single();

      if (insertResponse.error) {
        throw insertResponse.error;
      }

      genreIds.push(insertResponse.data.id);
    } else {
      genreIds.push(data.id);
    }
  }

  return genreIds;
}
