'use client';

import { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import discogs from '@/utils/discogs';
import Image from 'next/image';
import Input from '@/components/Input';
import MultiInput from '@/components/MultiInput';
import TracksInput from '@/components/TracksInput';
import axios from 'axios';
import toBase64 from '@/utils/toBase64';
import {
  HiArchiveBox,
  HiBookmark,
  HiFlag,
  HiPencil,
  HiPlus,
} from 'react-icons/hi2';
import { RadioGroup } from '@headlessui/react';
import { clsx } from 'clsx';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface NewRecordProps {
  searchParams: {
    albumId: string;
  };
}

interface Track {
  position: string;
  title: string;
  duration: string;
}

const NewRecord: React.FC<NewRecordProps> = ({ searchParams: { albumId } }) => {
  const router = useRouter();

  const { data: release, isSuccess } = useQuery(
    [`GET /release/${albumId ?? ''}`],
    async () => await discogs.getRelease(albumId),
    { enabled: !!albumId },
  );

  const [title, setTitle] = useState('');
  const [artists, setArtists] = useState<string[]>([]);
  const [imageUrl, setImageUrl] = useState(
    'https://ywdfvbklrcneunbhlekj.supabase.co/storage/v1/object/public/images/album_cover_placeholder.jpg',
  );
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [releaseDateYear, setReleaseDateYear] = useState('');
  const [genres, setGenres] = useState<string[]>([]);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [status, setStatus] = useState<'owned' | 'wishlist'>('owned');

  const [toastId, setToastId] = useState('');

  useEffect(() => {
    if (!isSuccess || !release) return;

    setTitle(release.title);
    setArtists(release.artists.map((artist: { name: string }) => artist.name));
    setReleaseDateYear(release.year);
    setGenres(release.genres);
    setImageUrl(release.images[0].uri);

    setTracks(
      release.tracklist.map(
        (track: {
          position: string;
          title: string;
          duration: string;
          extraartists: { name: string; role: string }[];
        }) => ({
          position: track.position,
          title: discogs.generateTitleWithFeatures(
            track.title,
            track.extraartists,
          ),
          duration: track.duration,
        }),
      ),
    );

    console.log(release);
  }, [isSuccess]);

  const addRecord = useMutation({
    mutationFn: async () => {
      const newToastId = toast.loading('Adding record...');
      setToastId(newToastId);

      return axios.post('http://localhost:3000/api/albums', {
        title,
        artists,
        releaseDateYear,
        genres,
        tracks,
        imageUrl,
        imageFile: imageFile
          ? {
              name: imageFile.name,
              base64: await toBase64(imageFile),
            }
          : null,
        status,
      });
    },
    onSuccess: () => {
      toast.success('Record added!', { id: toastId });
      router.push('/dashboard');
      router.refresh();
    },
    onError: () => {
      toast.error('Something went wrong!', { id: toastId });
    },
  });

  return (
    <main className="m-auto max-w-5xl px-6 py-24">
      <div className="flex gap-3">
        <div className="relative w-fit">
          <Image
            src={imageUrl}
            alt="placeholder album cover"
            width={256}
            height={256}
            className="aspect-square w-64 object-cover shadow-lg"
          />
          <label
            htmlFor="image"
            className="absolute inset-0 flex cursor-pointer items-center justify-center bg-stone-900/30 text-white/80 transition hover:bg-stone-900/40"
          >
            <HiPencil className="h-1/4 w-1/4" />
          </label>

          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (!e.target.files) return;

              setImageFile(e.target.files[0]);
              setImageUrl(URL.createObjectURL(e.target.files[0]));
            }}
            className="hidden"
          />
        </div>

        <button className="relative opacity-20 transition hover:opacity-40">
          <Image
            src="/record_texture.webp"
            alt="vinyl disc"
            width={256}
            height={256}
            className="h-64 w-64 rounded-full"
          />
          <HiPlus className="absolute bottom-0 right-0 m-1 text-2xl" />
        </button>
      </div>

      <div className="my-6 h-0.5 w-full rounded-full bg-stone-300"></div>

      <div className="flex flex-col gap-4">
        <RadioGroup
          value={status}
          onChange={setStatus}
          className="flex flex-col gap-2 text-stone-800"
        >
          <RadioGroup.Label className="text-base font-semibold">
            Status
          </RadioGroup.Label>
          <div className="text-lg font-medium">
            <RadioGroup.Option
              value="owned"
              className="flex w-fit cursor-pointer items-center gap-2"
            >
              {({ checked }) => (
                <>
                  <div className="rounded-full border border-stone-400 bg-stone-300 p-1">
                    <div
                      className={clsx(
                        'h-2 w-2 rounded-full transition',
                        checked && 'bg-stone-600',
                      )}
                    ></div>
                  </div>
                  <span className="flex w-fit items-center gap-2">
                    <HiArchiveBox />
                    Owned
                  </span>
                </>
              )}
            </RadioGroup.Option>
            <RadioGroup.Option
              value="wishlist"
              className="flex w-fit cursor-pointer items-center gap-2"
            >
              {({ checked }) => (
                <>
                  <div className="rounded-full border border-stone-400 bg-stone-300 p-1">
                    <div
                      className={clsx(
                        'h-2 w-2 rounded-full transition',
                        checked && 'bg-stone-600',
                      )}
                    ></div>
                  </div>
                  <span className="flex w-fit items-center gap-2">
                    <HiBookmark />
                    Wishlist
                  </span>
                </>
              )}
            </RadioGroup.Option>
          </div>
        </RadioGroup>

        <Input
          labelText="Album title"
          inputType="text"
          placeholder="Title"
          value={title}
          setValue={setTitle}
        />

        <MultiInput
          labelText="Artists"
          placeholder="Add artist"
          values={artists}
          setValues={setArtists}
        />

        <Input
          labelText="Release date"
          inputType="number"
          placeholder="Date"
          value={releaseDateYear}
          setValue={setReleaseDateYear}
        />

        <MultiInput
          labelText="Genres"
          placeholder="Add genre"
          values={genres}
          setValues={setGenres}
        />
      </div>

      <div className="my-10">
        <TracksInput tracks={tracks} setTracks={setTracks} />
      </div>

      <div className="flex justify-center">
        <button
          onClick={() => addRecord.mutate()}
          className="group fixed bottom-0 mb-8 ml-2 rounded-md border border-stone-400 bg-stone-200 p-0.5 text-lg shadow-lg"
        >
          <div className="flex items-center gap-1 rounded bg-stone-700 p-2 text-white transition group-hover:bg-stone-600">
            <HiPlus />
            Save record
          </div>
        </button>
      </div>
    </main>
  );
};

export default NewRecord;
