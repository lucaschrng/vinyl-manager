import { HiPlusSmall, HiXMark } from 'react-icons/hi2';
import { clsx } from 'clsx';
import { Dispatch, SetStateAction, useState } from 'react';

interface MultiInputProps {
  labelText: string;
  placeholder: string;
  values: string[];
  setValues: Dispatch<SetStateAction<string[]>>;
}

const MultiInput: React.FC<MultiInputProps> = ({
  labelText,
  placeholder,
  values,
  setValues,
}) => {
  const [newValue, setNewValue] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newValue === '') return;

    setValues((prev) => [...prev, newValue]);
    setNewValue('');
  };

  return (
    <form
      className="flex w-full max-w-sm flex-col gap-2"
      onSubmit={handleSubmit}
    >
      <label className="font-semibold">{labelText}</label>
      <div className="flex flex-wrap gap-1">
        {values.map((value, index) => (
          <span
            key={index}
            className="flex items-center gap-1 whitespace-nowrap rounded bg-stone-600 px-2 py-1 font-medium text-white"
          >
            {value}
            <button
              type="button"
              className="text-stone-300 hover:text-stone-100"
              onClick={() =>
                setValues((prev) => prev.filter((a) => a !== value))
              }
            >
              <HiXMark />
            </button>
          </span>
        ))}
      </div>
      <div className="flex rounded-lg border border-stone-300 bg-white p-3 text-lg font-medium focus-within:outline">
        <input
          type="text"
          placeholder={placeholder}
          className="w-full outline-none"
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
        />
        <button type="submit">
          <HiPlusSmall
            className={clsx(
              'h-6 w-6 transition',
              newValue !== '' ? 'text-stone-700' : 'text-stone-400',
            )}
          />
        </button>
      </div>
    </form>
  );
};

export default MultiInput;
