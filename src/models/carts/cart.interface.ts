import { productInterface } from '../products/product.interface';

export interface cartInterface {
  products: productInterface[];
  voucherId: string;
  totalProductsInCart: number;
  addreess: [];
  totalPrice: number;
  grandTotal: string;
}
