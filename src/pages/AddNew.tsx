import { FormEvent, useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { CATEGORIES } from '../constants/options';
import Dropdown from "../components/common/Dropdown";
import TextField from "../components/common/TextField";
import { ProductTypes } from "../constants/types";
import Products from '../providers/store';

const AddNew = () => {
  const navigate = useNavigate();
  const { initialState, create, update } = useContext(Products);
  const { state } = useLocation();
  const [formData, setFormData] = useState<ProductTypes>(initialState);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleOnChange = (v: any) => setFormData((prev) => ({ ...prev, ...v }));
  useEffect(() => { setFormData({ ...state }) }, [state]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    try {
      state ? update(formData) : create(formData);
      setSubmitSuccess(!0);
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="flex flex-col w-full px-5 py-2">
      <span className="flex flex-grow gap-2 items-center w-full mb-5">
        <button className="text-2xl" onClick={() => navigate('/')}>
          <i className="bi bi-arrow-left-circle" />
        </button>
        <h1 className="text-sm font-bold uppercase">
          {`${state ? 'Edit' : 'New'} Product`}
        </h1>
      </span>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2  bg-white  shadow-2xl rounded-xl border border-2 p-5 w-2/4">
        <TextField disabled={submitSuccess} name="title" value={handleOnChange} initialValue={formData.title} />
        <TextField disabled={submitSuccess} rows={2} name="description" value={handleOnChange} initialValue={formData.description} />
        <Dropdown disabled={submitSuccess} name="category" value={handleOnChange} initialValue={formData.category} options={CATEGORIES} />
        <TextField disabled={submitSuccess} type="number" name="price" value={handleOnChange} initialValue={String(formData.price)} />
        {submitSuccess ? (
          <span className="text-sm self-end">
            {`Item ${state ? 'updated' : 'added'} sucessfully. Click `}
            <button className="text-blue underline font-semibold" onClick={() => navigate('/')}>
              here
            </button>
            {'  to return to shop.'}
          </span>
        ) : (
          <button type="submit" className="self-end text-xs py-2 px-4 bg-red-500 text-white rounded-xl font-semibold uppercase">
            {state ? 'Save Changes' : 'Submit'}
          </button>
        )}
      </form>
    </div >
  );
}

export default AddNew;