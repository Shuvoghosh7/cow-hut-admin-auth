import { Model } from 'mongoose';

export type IUserRoll = 'seller' | 'buyer';

export type IUser  = {
  password: string;
  role: IUserRoll;
  name: {
    firstName: string;
    lastName: string;
  };
  phoneNumber: string;
  address: string;
  budget: number;
  income: number;
};

export type UserModel = Model<IUser, Record<string, unknown>>;

export type IUserFilters = {
  searchTerm?: string;
};
