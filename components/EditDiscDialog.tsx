import { Dialog } from '@headlessui/react';
import { HiArrowDownTray, HiTrash } from 'react-icons/hi2';
import Disc from '@/components/Disc';
import ListboxInput from '@/components/ListboxInput';
import colorStylesConfig from '@/config/colorStylesConfig';
import ColorInput from '@/components/ColorInput';
import { ColorStyle, VinylDisc } from '@/types/vinylDisc';
import { Dispatch, SetStateAction, useState } from 'react';
import toBase64 from '@/utils/toBase64';

interface EditDiscDialogProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  editedDisc: VinylDisc;
  setEditedDisc: Dispatch<SetStateAction<VinylDisc>>;
  handleSave: () => void;
  handleDelete: () => void;
  handleCancel: () => void;
}

const EditDiscDialog: React.FC<EditDiscDialogProps> = ({
  isOpen,
  setIsOpen,
  editedDisc,
  setEditedDisc,
  handleSave,
  handleDelete,
  handleCancel,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [totalColors, setTotalColors] = useState(1);

  const handleStyleChange = (value: ColorStyle) => {
    setEditedDisc((prev) => ({ ...prev, colorStyle: value }));
    setTotalColors(colorStylesConfig[value] ?? 1);
  };

  const handleLabelImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const labelImageFile = file
      ? {
          name: file.name,
          base64: (await toBase64(file)) as string,
        }
      : undefined;

    setEditedDisc((prev) => ({
      ...prev,
      labelImageUrl: URL.createObjectURL(file),
      labelStyle: 'image',
      labelImageFile: labelImageFile,
    }));
  };

  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
      <div className="fixed inset-0 z-10 bg-black bg-opacity-25" />

      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center">
          <Dialog.Panel className="w-full max-w-md transform rounded bg-stone-100 p-6 text-left align-middle transition-all">
            <div className="mb-4 flex items-center justify-between">
              <Dialog.Title className="text-2xl font-semibold">
                Disc style
              </Dialog.Title>

              <button
                onClick={handleDelete}
                className="text-lg text-red-500/80 hover:text-red-500"
              >
                <HiTrash />
              </button>
            </div>

            <div className="m-auto w-64">
              <Disc
                colorStyle={editedDisc.colorStyle}
                color1={editedDisc.color1}
                color2={editedDisc.color2}
                color3={editedDisc.color3}
                labelColor={editedDisc.labelColor}
                labelImageUrl={editedDisc.labelImageUrl}
                labelStyle={editedDisc.labelStyle}
              />
            </div>

            <div className="mt-4 flex w-full flex-col gap-4">
              <ListboxInput
                labelText="Style"
                value={editedDisc.colorStyle}
                onChange={handleStyleChange}
                options={Object.keys(colorStylesConfig)}
              />

              <div className="flex w-full flex-col gap-2">
                <label className="font-semibold">Colors</label>
                <div className="flex gap-1">
                  {[
                    editedDisc.color1,
                    editedDisc.color2,
                    editedDisc.color3,
                  ].map((color, index) => (
                    <ColorInput
                      key={index}
                      colorIndex={
                        `color${index + 1}` as 'color1' | 'color2' | 'color3'
                      }
                      color={color ?? '#000000'}
                      setDisc={setEditedDisc}
                      deactivated={index >= totalColors}
                    />
                  ))}
                </div>
              </div>

              <div className="flex w-full flex-col gap-2">
                <label className="font-semibold">Label</label>

                <div className="flex items-center gap-4">
                  <ColorInput
                    colorIndex={'labelColor'}
                    color={editedDisc.labelColor ?? '#000000'}
                    setDisc={setEditedDisc}
                  />

                  <span className="font-medium text-stone-500">or</span>

                  <label
                    className="flex h-10 w-full cursor-pointer items-center justify-center gap-1 rounded border border-stone-300 bg-stone-200 text-sm"
                    htmlFor="labelImage"
                  >
                    <HiArrowDownTray />
                    Upload image
                  </label>

                  <input
                    id="labelImage"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleLabelImageChange}
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-1">
              <button
                onClick={handleCancel}
                className="rounded bg-stone-200 px-3 py-2 font-medium transition hover:bg-stone-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="rounded bg-stone-700 px-3 py-2 font-medium text-white transition hover:bg-stone-800"
              >
                Save
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
};

export default EditDiscDialog;
