import { Model, Types } from 'mongoose';
import { IUser } from '../user/user.interface';

export type ICowlocation =
  | 'Dhaka'
  | 'Chattogram'
  | 'Barishal'
  | 'Rajshahi'
  | 'Sylhet'
  | 'Comilla'
  | 'Rangpur'
  | 'Mymensingh';

export type ILabel = 'for sale' | 'sold out';
export type ICategory = 'Dairy' | 'Beef' | 'DualPurpose';

export type ICow = {
  name: string;
  age: number;
  price: number;
  location: ICowlocation;
  breed: string;
  weight: number;
  label: ILabel;
  category: ICategory;
  seller: Types.ObjectId | IUser;
};

export type CowModel = Model<IUser, Record<string, unknown>>;

export type ICowFilters = {
  searchTerm?: string;
};
