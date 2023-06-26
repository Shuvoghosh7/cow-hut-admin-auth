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

export type UserModel = {
  isUserExist(
    // eslint-disable-next-line no-unused-vars
    phoneNumber: string
  ): Promise<Pick<IUser, 'phoneNumber' | 'password' | 'role' >>;
  isPasswordMatched(
    // eslint-disable-next-line no-unused-vars
    givenPassword: string,
    // eslint-disable-next-line no-unused-vars
    savedPassword: string
  ): Promise<boolean>;
} & Model<IUser>;
// export type UserModel = Model<IUser, Record<string, unknown>>;

export type IUserFilters = {
  searchTerm?: string;
};
