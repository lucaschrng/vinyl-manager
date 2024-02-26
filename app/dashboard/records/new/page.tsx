'use client';

import { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import discogs from '@/utils/discogs';
import Input from '@/components/Input';
import MultiInput from '@/components/MultiInput';
import TracksInput from '@/components/TracksInput';
import axios from 'axios';
import toBase64 from '@/utils/toBase64';
import { HiPlus } from 'react-icons/hi2';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { VinylDisc } from '@/types/vinylDisc';
import EditableDisc from '@/components/EditableDisc';
import CoverImageInput from '@/components/CoverImageInput';
import AddDiscButton from '@/components/AddDiscButton';
import StatusInput from '@/components/StatusInput';

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

  const [vinylDiscs, setVinylDiscs] = useState<VinylDisc[]>([
    {
      color1: '#000000',
      colorStyle: 'solid',
      labelColor: '#000000',
      labelStyle: 'solid',
      order: 1,
    },
  ]);

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
        vinylDiscs,
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

  useEffect(() => {
    console.log(vinylDiscs);
  }, [vinylDiscs]);

  return (
    <main className="m-auto max-w-5xl px-6 py-24">
      <div className="relative">
        <AddDiscButton
          totalDiscs={vinylDiscs.length}
          setVinylDiscs={setVinylDiscs}
        />

        {vinylDiscs
          .map((vinylDisc, index, i) => (
            <EditableDisc
              key={vinylDisc.order}
              index={index}
              vinylDisc={vinylDisc}
              setVinylDiscs={setVinylDiscs}
            />
          ))
          .reverse()}

        <CoverImageInput
          imageUrl={imageUrl}
          setImageFile={setImageFile}
          setImageUrl={setImageUrl}
        />
      </div>

      <div className="my-6 h-0.5 w-full rounded-full bg-stone-300"></div>

      <div className="flex flex-col gap-4">
        <StatusInput status={status} setStatus={setStatus} />

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
