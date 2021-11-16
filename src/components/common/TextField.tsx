import { ChangeEvent } from "react";

export interface ITextField {
  name: string,
  type?: string,
  value: (e: any) => void,
  initialValue?: string | number,
  rows?: number,
}
const TextField = ({ name, value, type = 'text', initialValue = '', rows }: ITextField) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.preventDefault();
    value({ [e.target.name]: e.target.value })
  }

  return (
    <span className="flex flex-col gap-1">
      <span className="text-sm capitalize">{name}</span>
      {!rows ? (
        <input
          className="border py-1 px-2 rounded-lg border-2 w-full"
          placeholder={`enter ${name}...`}
          name={name}
          multiple
          value={initialValue}
          type={type}
          onChange={handleChange}
        />
      ) : (
        <textarea
          className="border py-1 px-2 rounded-lg border-2 w-full resize-none"
          placeholder={`enter ${name}...`}
          name={name}
          rows={rows}
          defaultValue={initialValue}
          onChange={handleChange}
        />
      )}
    </span>
  );
}

export default TextField;