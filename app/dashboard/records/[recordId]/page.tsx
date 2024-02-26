import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/types/supabase';
import { cookies } from 'next/headers';
import Image from 'next/image';
import EditableDisc from '@/components/EditableDisc';
import Disc from '@/components/Disc';
import { ColorStyle } from '@/types/vinylDisc';
import { clsx } from 'clsx';
import { HiArchiveBox } from 'react-icons/hi2';

interface RecordProps {
  params: {
    recordId: string;
  };
}

const getRecord = async (recordId: string) => {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { data: record } = await supabase
    .from('albums')
    .select(
      '*, artists(name), genres(name), tracks(position, title, duration), vinyl_discs(*)',
    )
    .eq('id', recordId)
    .single();

  if (!record) return;

  if (record.cover_image && !record.cover_image.startsWith('http')) {
    const { data: image } = supabase.storage
      .from('images')
      .getPublicUrl(record.cover_image ?? '');

    record.cover_image = image.publicUrl;
  }

  return record;
};

const Record: React.FC<RecordProps> = async ({ params: { recordId } }) => {
  const record = await getRecord(recordId);

  if (!record) return null;

  return (
    <main className="m-auto max-w-5xl px-6 py-24">
      <div className="relative aspect-square w-64">
        {record.vinyl_discs
          .map((vinylDisc, index, i) => (
            <div
              key={vinylDisc.order}
              className="absolute flex h-full w-[250px] items-center rounded-full"
              style={{
                marginLeft: `${index * 6 + 9}rem`,
              }}
            >
              <Disc
                color1={vinylDisc.color_1 ?? '#000000'}
                color2={vinylDisc.color_2 ?? '#000000'}
                color3={vinylDisc.color_3 ?? '#000000'}
                colorStyle={vinylDisc.color_style as ColorStyle}
                labelColor={vinylDisc.label_color ?? '#000000'}
                labelImageUrl={vinylDisc.label_image_url ?? ''}
                labelStyle={vinylDisc.label_style ?? 'solid'}
              />
            </div>
          ))
          .reverse()}

        <Image
          src={record.cover_image ?? ''}
          alt="placeholder album cover"
          width={256}
          height={256}
          className="absolute inset-0 aspect-square object-cover shadow-lg"
        />
      </div>

      <div className="mb-8 mt-6 h-0.5 w-full rounded-full bg-stone-300"></div>

      <h2 className="flex items-center gap-4 text-2xl font-semibold">
        {record.title}
        {record.release_date_year ? ` • ${record.release_date_year}` : ''}
        {record.status && (
          <span className="flex h-fit w-fit items-center gap-1 rounded bg-stone-600 px-2 py-1 text-sm font-normal capitalize text-white">
            {record.status === 'owned' && <HiArchiveBox />}
            {record.status}
          </span>
        )}
      </h2>
      <p className="text-2xl text-stone-500">
        {record.artists.map((artist) => artist.name).join(', ')}
      </p>

      <div className="mt-4 flex gap-1">
        {record.genres.map((genre) => (
          <span
            key={genre.name}
            className="rounded bg-stone-200 px-2 py-1 text-sm text-stone-500"
          >
            {genre.name}
          </span>
        ))}
      </div>

      <h3 className="mt-14 text-xl font-semibold">Tracks</h3>

      <div className="mt-6 flex flex-col gap-1">
        {record.tracks.map((track, index) => (
          <>
            <div
              key={track.position}
              className={clsx(
                'flex items-center gap-2 rounded px-3 py-2 font-medium',
                index % 2 || 'bg-stone-200',
              )}
            >
              {track.position && (
                <div className="w-8 text-stone-600">{track.position}</div>
              )}

              <div className="flex w-full items-center justify-between">
                <div className="text-lg">{track.title}</div>
                {track.duration && (
                  <div className="text-stone-600">{track.duration}</div>
                )}
              </div>
            </div>
          </>
        ))}
      </div>
    </main>
  );
};

export default Record;
