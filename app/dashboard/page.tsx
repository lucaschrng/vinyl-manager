import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/types/supabase';
import Image from 'next/image';

const getAlbums = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { data: albums } = await supabase
    .from('albums')
    .select('*, artists(name)')
    .eq('user_id', session?.user.id);

  albums?.map(async (album) => {
    if (album.cover_image && album.cover_image.startsWith('http')) return;

    const { data: image } = supabase.storage
      .from('images')
      .getPublicUrl(album.cover_image ?? '');

    album.cover_image = image.publicUrl;
  });

  return albums;
};

const Dashboard = async () => {
  const albums = await getAlbums();

  return (
    <div className="m-auto max-w-5xl px-6 py-24">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold">Records</h1>
      </div>

      <div className="mb-10 mt-2 h-0.5 w-full rounded-full bg-stone-300"></div>

      <div
        className="grid gap-4"
        style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr)' }}
      >
        {albums?.map((album) => (
          <div key={album.id}>
            <Image
              src={album.cover_image ?? ''}
              alt="album cover"
              width={160}
              height={160}
              className="aspect-square w-full object-cover shadow-lg"
              blurDataURL="/album_cover_placeholder.jpg"
              placeholder="blur"
            />
            <p className="mt-2 font-medium leading-5">
              {album.title}
              <br />
              <span className="text-neutral-500">{`${album.artists
                .map((artist) => artist.name)
                .join(', ')} • ${album.release_date_year}`}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
