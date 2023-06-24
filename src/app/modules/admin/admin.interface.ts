import { Model } from 'mongoose';

export type IAdminRoll = 'admin';

export type IAdmin = {
  phoneNumber: string;
  role: IAdminRoll;
  password: string;
  name: {
    firstName: string;
    lastName: string;
  };
  address: string;
};

export type AdminModel = Model<IAdmin, Record<string, unknown>>;
