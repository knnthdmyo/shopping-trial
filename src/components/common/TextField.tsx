import { ChangeEvent } from 'react';
import { IInput } from '../../constants/types';

export default function TextField({ name, value, rows, type, initialValue }: IInput) {
  const onChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    value({ [target.name]: target.value })
  }

  return (
    <span className="flex flex-col gap-1">
      <span className="text=sm capitalize">{name}</span>
      {rows ? (
        <textarea
          rows={rows}
          value={initialValue}
          className="text-sm border border-2 border-gray-500 rounded-lg focus:border-blue px-2 py-1 resize-none"
          placeholder={`enter ${name}`}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={initialValue}
          onChange={onChange}
          className="text-sm border border-gray-500 border-2 rounded-lg focus:border-blue px-2 py-1"
          placeholder={`enter ${name}`}
        />
      )}
    </span>
  );
}
