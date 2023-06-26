import { Model, Types } from 'mongoose';

export type IAdminRoll = 'admin';

export type IAdmin = {
  id:Types.ObjectId;
  phoneNumber: string;
  role: IAdminRoll;
  password: string;
  name: {
    firstName: string;
    lastName: string;
  };
  address: string;
};

export type AdminModel = {
  isUserExist(
    // eslint-disable-next-line no-unused-vars
    phoneNumber: string
  ): Promise<Pick<IAdmin, 'phoneNumber' | 'password' | 'role' | 'id' >>;
  isPasswordMatched(
    // eslint-disable-next-line no-unused-vars
    givenPassword: string,
    // eslint-disable-next-line no-unused-vars
    savedPassword: string
  ): Promise<boolean>;
} & Model<IAdmin>;


// export type AdminModel = Model<IAdmin, Record<string, unknown>>;
