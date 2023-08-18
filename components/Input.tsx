import { Dispatch, SetStateAction } from 'react';

interface InputProps {
  labelText: string;
  inputType: 'text' | 'number';
  placeholder: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}

const Input: React.FC<InputProps> = ({
  labelText,
  inputType,
  placeholder,
  value,
  setValue,
}) => {
  return (
    <div className="flex w-full max-w-sm flex-col gap-2">
      <label className="font-semibold">{labelText}</label>
      <input
        type={inputType}
        placeholder={placeholder}
        className="rounded-lg border border-stone-300 p-3 text-lg font-medium"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export default Input;
