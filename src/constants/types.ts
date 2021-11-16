export interface ProductTypes {
  id?: number,
  title: string;
  description: string;
  price: number;
  rating: {
    rate: number,
    count: number,
  },
  category: string;
  image: string;
}

export interface IInput {
  type?: string;
  initialValue?: string;
  name: string;
  rows?: number;
  value: (v: any) => void,
}