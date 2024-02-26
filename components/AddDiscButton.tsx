import Image from 'next/image';
import { HiPlus } from 'react-icons/hi2';
import { Dispatch, SetStateAction } from 'react';
import { VinylDisc } from '@/types/vinylDisc';

interface AddDiscButtonProps {
  totalDiscs: number;
  setVinylDiscs: Dispatch<SetStateAction<VinylDisc[]>>;
}

const AddDiscButton: React.FC<AddDiscButtonProps> = ({
  totalDiscs,
  setVinylDiscs,
}) => {
  const addDisc = () => {
    setVinylDiscs((prev) => [
      ...prev,
      {
        color1: '#000000',
        colorStyle: 'solid',
        labelColor: '#000000',
        labelStyle: 'solid',
        order: prev.length + 1,
      },
    ]);
  };

  return (
    <button
      className="group absolute left-0 top-0 flex aspect-square h-full w-[252px] items-center overflow-hidden rounded-full rounded-br-none"
      style={{
        translate: `${totalDiscs * 6 + 8}rem 0`,
      }}
      onClick={addDisc}
    >
      <Image
        src="/record_texture.webp"
        alt="vinyl disc"
        width={256}
        height={256}
        className="rounded-full opacity-20 transition group-hover:opacity-40"
      />
      <HiPlus className="absolute bottom-0 right-0 m-1 text-2xl text-neutral-700 opacity-40 transition group-hover:opacity-100" />
    </button>
  );
};

export default AddDiscButton;
