import { RadioGroup } from '@headlessui/react';
import { clsx } from 'clsx';
import { HiArchiveBox, HiBookmark } from 'react-icons/hi2';
import { Dispatch, SetStateAction } from 'react';

interface StatusInputProps {
  status: 'owned' | 'wishlist';
  setStatus: Dispatch<SetStateAction<'owned' | 'wishlist'>>;
}

const StatusInput: React.FC<StatusInputProps> = ({ status, setStatus }) => {
  return (
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
  );
};

export default StatusInput;
