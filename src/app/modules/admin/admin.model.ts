import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import { AdminModel, IAdmin } from './admin.interface';
import { adminRoll } from './admin.constant';
import config from '../../../config';

const adminSchema = new Schema<IAdmin,AdminModel>(
  {
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
      enum: adminRoll,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
    },
    address: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

adminSchema.statics.isUserExist = async function (
  phoneNumber: string
): Promise<Pick<
  IAdmin,
  'password' | 'role' | 'id'
> | null> {
  return await Admin.findOne(
    { phoneNumber},
    {id:1, phoneNumber: 1, password: 1, role: 1 }
  );
};

adminSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword);
};

adminSchema.pre('save', async function (next) {
  // hashing user password
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bycrypt_salt_rounds)
  );
  next();
});
export const Admin = model<IAdmin, AdminModel>('Admin', adminSchema);
