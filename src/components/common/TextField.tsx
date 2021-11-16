import { ChangeEvent } from 'react';

export interface ITextField {
  type?: string;
  initialValue?: string;
  name: string;
  rows?: number;
  value: (v: any) => void;
  disabled?: boolean;
}

export default function TextField({ name, value, rows, type, initialValue, disabled }: ITextField) {
  const onChange = ({ target }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    value({ [target.name]: type === 'number' ? Number(target.value) : target.value })
  }

  return (
    <span className="flex flex-col gap-1">
      <span className="text=sm capitalize">{name}</span>
      {rows ? (
        <textarea
          disabled={disabled}
          rows={rows}
          name={name}
          value={initialValue}
          onChange={onChange}
          className="text-sm border border-2 border-gray-500 rounded-lg focus:border-blue px-2 py-1 resize-none"
          placeholder={`enter ${name}`}
        />
      ) : (
        <input
          type={type}
          name={name}
          disabled={disabled}
          value={initialValue}
          onChange={onChange}
          className="text-sm border border-gray-500 border-2 rounded-lg focus:border-blue px-2 py-1"
          placeholder={`enter ${name}`}
        />
      )}
    </span>
  );
}
