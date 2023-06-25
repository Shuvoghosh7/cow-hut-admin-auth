import { IAdmin } from "./admin.interface";
import { Admin } from "./admin.model";


const createAdmin = async (admin: IAdmin): Promise<IAdmin | null> => {
  const result = await Admin.create(admin);
  return result;
};

const getAllAdmin = async () => {
  const result = await Admin.find();
  return result;
};
export const AdminService = {
  createAdmin,
  getAllAdmin
  
};