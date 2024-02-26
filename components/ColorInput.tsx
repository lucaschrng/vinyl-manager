import { clsx } from 'clsx';
import { VinylDisc } from '@/types/vinylDisc';
import { Dispatch, SetStateAction } from 'react';
import { Dialog, Popover } from '@headlessui/react';
import { HexAlphaColorPicker } from 'react-colorful';

interface ColorInputProps {
  colorIndex: 'color1' | 'color2' | 'color3' | 'labelColor';
  color: string;
  deactivated?: boolean;
  setDisc: Dispatch<SetStateAction<VinylDisc>>;
}

const ColorInput: React.FC<ColorInputProps> = ({
  colorIndex,
  color,
  deactivated,
  setDisc,
}) => {
  const onChange = (color: string) => {
    setDisc((prev) => {
      const newDisc = { ...prev };
      newDisc[colorIndex] = color;
      return newDisc;
    });
  };

  return (
    <Popover className="relative flex w-full">
      <Popover.Button
        key={color}
        className={clsx(
          'h-10 w-full rounded-md border-2 border-stone-300/60 shadow',
          deactivated && 'pointer-events-none opacity-10',
        )}
        style={{ background: color ?? '#000000' }}
      />

      <Popover.Panel className="absolute z-10 w-min rounded-xl bg-stone-100 p-2 shadow">
        <HexAlphaColorPicker color={color} onChange={onChange} />
        <input
          type="text"
          className="mt-2 w-full rounded-lg border border-stone-300 px-3 py-1 text-lg font-medium"
          value={color}
          onChange={(e) => onChange(e.target.value)}
        />
      </Popover.Panel>
    </Popover>
  );
};

export default ColorInput;
