import { VinylDisc } from '@/types/vinylDisc';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Disc from '@/components/Disc';
import EditDiscDialog from '@/components/EditDiscDialog';

interface VinylDiscProps {
  index: number;
  vinylDisc: VinylDisc;
  setVinylDiscs: Dispatch<SetStateAction<VinylDisc[]>>;
}

const EditableDisc: React.FC<VinylDiscProps> = ({
  index,
  vinylDisc,
  setVinylDiscs,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editedVinylDisc, setEditedVinylDisc] = useState<VinylDisc>({
    ...vinylDisc,
  });

  useEffect(() => {
    setEditedVinylDisc({ ...vinylDisc });
  }, [vinylDisc]);

  const updateVinylDisc = () => {
    setVinylDiscs((prev) => {
      const newVinylDiscs = [...prev];
      newVinylDiscs[index] = editedVinylDisc;
      return newVinylDiscs;
    });
  };

  const handleSave = () => {
    updateVinylDisc();
    setIsOpen(false);
  };

  const handleDelete = () => {
    setVinylDiscs((prev) => {
      const newVinylDiscs = [...prev];
      newVinylDiscs.splice(index, 1);
      newVinylDiscs.map((disc, index) => (disc.order = index + 1));
      return newVinylDiscs;
    });
    setIsOpen(false);
  };

  const handleCancel = () => {
    setEditedVinylDisc({ ...vinylDisc });
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="group absolute flex h-full w-[252px] items-center overflow-hidden rounded-full"
        style={{
          marginLeft: `${index * 6 + 8}rem`,
        }}
      >
        <Disc
          colorStyle={vinylDisc.colorStyle}
          color1={vinylDisc.color1}
          color2={vinylDisc.color2}
          color3={vinylDisc.color3}
          labelColor={vinylDisc.labelColor}
          labelImageUrl={vinylDisc.labelImageUrl}
          labelStyle={vinylDisc.labelStyle}
        />

        <div className="absolute inset-0 rounded-full bg-white opacity-0 transition group-hover:opacity-5"></div>
      </button>

      <EditDiscDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        editedDisc={editedVinylDisc}
        setEditedDisc={setEditedVinylDisc}
        handleSave={handleSave}
        handleDelete={handleDelete}
        handleCancel={handleCancel}
      />
    </>
  );
};

export default EditableDisc;
