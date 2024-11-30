

export interface blogInterface {
  name: string;
  sortDescription: string;
  description?: string;
  category: string;
  tags?: string[];
  cardImage: string;
  coverImages?: string;
  images?: string[];
  isDeleted?: boolean;
  isDisabled?: boolean;
  isVerified?: boolean;
  createdAt?:Date,
  updatedAt?:Date
}


