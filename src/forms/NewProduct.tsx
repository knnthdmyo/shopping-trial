import { FormEvent, useContext, useEffect, useState } from "react";
import Products from '../providers/store';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { initialValue, ProductTypes } from '../constants/types';
import TextField from "../components/common/TextField";
import Dropdown from "../components/common/Dropdown";
import { CATEGORIES } from '../constants/options';


const NewProduct = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { create, update } = useContext(Products);
  const [formData, setFormData] = useState<ProductTypes>(initialValue);
  const handleChange = (e: any) => setFormData((prev) => ({ ...prev, ...e }));

  useEffect(() => {
    if (state) {
      setFormData({ ...state });
    }
  }, [state]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (state) {
      update(formData);
    } else {
      create(formData);
    }
  }

  useEffect(() => { console.log(formData) }, [formData]);

  return (
    <div className="flex flex-col p-5 gap-4 w-2/4">
      <span className="flex gap-2">
        <button className="text-3xl" onClick={() => navigate('/')}>
          <i className="bi bi-arrow-left-circle" />
        </button>
        <h1 className="text-2xl capitalize">Add new item</h1>
      </span>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <TextField initialValue={formData.title} name="title" value={handleChange} />
        <TextField rows={2} initialValue={formData.description} name="description" value={handleChange} />
        <Dropdown initialValue={formData.category} name="category" options={CATEGORIES} value={handleChange} />
        <TextField type={Number(formData.price) ? 'number' : 'text'} initialValue={formData.price} name="price" value={handleChange} />
        <button className="bg-red-500 text-white rounded-lg p-2" type="submit">
          {state ? 'Save Changes' : 'Submit'}
        </button>
      </form>
    </div>
  );
}

export default NewProduct;