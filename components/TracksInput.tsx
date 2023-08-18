import { Dispatch, SetStateAction } from 'react';
import { HiPlus, HiTrash, HiXMark } from 'react-icons/hi2';

interface Track {
  position: string;
  title: string;
  duration: string;
}

interface TracksInputProps {
  tracks: Track[];
  setTracks: Dispatch<SetStateAction<Track[]>>;
}

const TracksInput: React.FC<TracksInputProps> = ({ tracks, setTracks }) => {
  const addTrack = () => {
    setTracks((prev) => [...prev, { position: '', title: '', duration: '' }]);
  };

  return (
    <>
      <h2 className="text-2xl font-semibold">Tracks</h2>
      <ul className="mt-4 flex flex-col gap-2 font-medium">
        {tracks.map((track, index) => (
          <li key={index} className="flex gap-1">
            <input
              type="text"
              placeholder="#"
              value={track.position}
              onChange={(e) => {
                const newTracks = [...tracks];
                newTracks[index].position = e.target.value;
                setTracks(newTracks);
              }}
              className="w-16 rounded-lg border border-stone-300 p-1 text-center text-lg font-medium"
            />

            <input
              type="text"
              placeholder="Title"
              value={track.title}
              onChange={(e) => {
                const newTracks = [...tracks];
                newTracks[index].title = e.target.value;
                setTracks(newTracks);
              }}
              className="w-full rounded-lg border border-stone-300 p-2 text-lg font-medium"
            />

            <input
              type="text"
              placeholder="00:00"
              value={track.duration}
              onChange={(e) => {
                const newTracks = [...tracks];
                newTracks[index].duration = e.target.value;
                setTracks(newTracks);
              }}
              className="w-20 rounded-lg border border-stone-300 p-2 text-center text-lg font-medium"
            />

            <button
              className="rounded-lg border border-red-300 bg-red-100 p-2 text-center text-lg font-medium text-red-400 hover:text-red-500"
              onClick={() => {
                const newTracks = [...tracks];
                newTracks.splice(index, 1);
                setTracks(newTracks);
              }}
            >
              <HiTrash />
            </button>
          </li>
        ))}
      </ul>

      <button
        type="button"
        className="mt-3 flex items-center gap-1 text-stone-500 hover:text-stone-800"
        onClick={addTrack}
      >
        <HiPlus />
        Add Track
      </button>
    </>
  );
};

export default TracksInput;

// <ul className="mt-4 flex flex-col gap-1 font-medium">
//   {tracks.map((track) => (
//     <li key={track.position}>
//       <div className="relative flex max-w-full  items-center">
//               <span className="absolute -translate-x-full pr-3 font-semibold text-stone-500">
//                 {track.position}
//               </span>
//
//         <p className="whitespace-nowrap text-lg">{track.title}</p>
//
//         <span className="mx-2 overflow-hidden whitespace-nowrap text-lg text-neutral-400">
//                 {Array.from({ length: 400 }, (_, i) => '.')}
//               </span>
//
//         <div className="flex w-fit items-center gap-2">
//           <p className="text-lg text-stone-700">{track.duration}</p>
//           <button
//             type="button"
//             className="text-stone-500 hover:text-stone-800"
//             onClick={() =>
//               setTracks((prev) =>
//                 prev.filter((t) => t.position !== track.position),
//               )
//             }
//           >
//             <HiXMark />
//           </button>
//         </div>
//       </div>
//     </li>
//   ))}
// </ul>
