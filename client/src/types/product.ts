export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  coralType: string;
  difficulty: string;
  parMin: number;
  parMax: number;
  flow: string;
  price: number;
  createdAt: string;
}

export type ProductType = {
  id: number;
  title: string;
  price: string;
  image: string;
};
