import Image from 'next/image';
import { HiPencil } from 'react-icons/hi2';
import { Dispatch, SetStateAction } from 'react';

interface CoverImageInputProps {
  imageUrl: string;
  setImageFile: Dispatch<SetStateAction<File | null>>;
  setImageUrl: Dispatch<SetStateAction<string>>;
}

const CoverImageInput: React.FC<CoverImageInputProps> = ({
  imageUrl,
  setImageFile,
  setImageUrl,
}) => {
  return (
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
  );
};

export default CoverImageInput;
