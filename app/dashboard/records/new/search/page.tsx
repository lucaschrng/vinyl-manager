'use client';

import { useEffect, useState } from 'react';
import { HiMagnifyingGlass, HiXMark } from 'react-icons/hi2';
import discogs from '@/utils/discogs';
import { useDebounce } from 'use-debounce';
import { clsx } from 'clsx';
import Link from 'next/link';
import Image from 'next/image';
import RecordCard from '@/components/RecordCard';

interface Album {
  id: string;
  title: string;
  artists: string[];
  year: string;
  genres: string[];
  cover_image: string;
  country: string;
  tracklist: {
    position: string;
    title: string;
    duration: string;
  }[];
}

const NewRecordSearch = () => {
  const [query, setQuery] = useState('');
  const [debouncedQuery] = useDebounce(query, 500);
  const [results, setResults] = useState<Album[]>();

  useEffect(() => {
    const search = async () => {
      if (!debouncedQuery) return;

      setResults(await discogs.search(debouncedQuery));
      console.log(results);
    };

    search();
  }, [debouncedQuery]);

  return (
    <div className="m-auto max-w-5xl px-6 py-24">
      <div className="flex items-center gap-2">
        <HiMagnifyingGlass className="text-3xl text-neutral-500" />
        <input
          type="text"
          placeholder="Search for a record"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-transparent text-3xl font-semibold placeholder-stone-300 outline-none placeholder:font-medium"
          autoFocus
        />
        <button
          className={clsx(
            'text-3xl text-neutral-500 transition-opacity hover:text-neutral-800',
            query === '' && 'pointer-events-none opacity-0',
          )}
          onClick={() => setQuery('')}
        >
          <HiXMark />
        </button>
      </div>

      <div className="mb-10 mt-3 h-0.5 w-full rounded-full bg-stone-300"></div>

      <div
        className="grid gap-1"
        style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))' }}
      >
        {results?.map((album) => (
          <RecordCard
            key={album.id}
            href={`/dashboard/records/new?albumId=${album.id}`}
            imageSrc={album.cover_image}
            title={album.title}
            subtitle={`${album.country} • ${album.year}`}
          />
        ))}
      </div>
    </div>
  );
};

export default NewRecordSearch;
