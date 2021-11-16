import { FormEvent, useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import TextField from "../components/common/TextField";
import { ProductTypes } from "../constants/types";
import Products from '../providers/store';

const AddNew = () => {
  const navigate = useNavigate();
  const { initialState } = useContext(Products);
  const [formData, setFormData] = useState<ProductTypes>(initialState);

  const handleOnChange = (v: any) => setFormData((prev) => ({ ...prev, ...v }));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(formData);
  }

  useEffect(() => { console.log(formData) }, [formData])

  return (
    <div className="px-5 w-2/4">
      <span className="flex gap-2 items-center mb-5">
        <button className="text-2xl" onClick={() => navigate('/')}>
          <i className="bi bi-arrow-left-circle" />
        </button>
        <h1>New Item</h1>
      </span>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <TextField name="title" value={handleOnChange} initialValue={formData.title} />
        <TextField rows={2} name="description" value={handleOnChange} initialValue={formData.description} />
        <TextField type="number" name="price" value={handleOnChange} initialValue={String(formData.price)} />
        <button type="submit" className="self-end text-xs py-2 px-4 bg-red-500 text-white rounded-xl font-semibold uppercase">
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddNew;