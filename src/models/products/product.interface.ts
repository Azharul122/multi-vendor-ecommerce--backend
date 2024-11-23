

export interface productInterface {
  name: string;
  sortDescription: string;
  description?: string;
  price: number;
  discountParcentage: number;
  stock?: number;
  category: string;
  tags?: string[];
  stokStatus?: string;
  cardImage: string;
  coverImages?: string;
  images?: string[];
  voucher?: string;
  isDeleted?: boolean;
  isDisabled?: boolean;
  isVerified?: boolean;
  isPopular?: boolean;
  createdAt?:Date,
  updatedAt?:Date
}
