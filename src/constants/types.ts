export interface ProductTypes {
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