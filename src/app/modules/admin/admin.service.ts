import { IAdmin } from "./admin.interface";
import { Admin } from "./admin.model";
import { ILoginUser, IRefreshTokenResponse } from '../auth/auth.interface';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import config from '../../../config';
import { Secret } from 'jsonwebtoken';


const createAdmin = async (admin: IAdmin): Promise<IAdmin | null> => {
  const result = await Admin.create(admin);
  return result;
};

const getAllAdmin = async () => {
  const result = await Admin.find();
  return result;
};

const loginAdmin = async (payload: ILoginUser) => {
  const { phoneNumber,password } = payload;
  const isUserExist = await Admin.isUserExist(phoneNumber)
  console.log(isUserExist)
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }
  if (
    isUserExist.password &&
    !(await Admin.isPasswordMatched(password, isUserExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }
  
   //create access token & refresh token
   const { phoneNumber:phone,role} = isUserExist;

   const accessToken = jwtHelpers.createToken(
    { phone, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelpers.createToken(
    { phone, role},
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );


  return{
    accessToken,
    refreshToken
  }
}
const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {

  let verifiedToken = null;
 
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');
  }
  const { phone } = verifiedToken;
  const isUserExist = await Admin.isUserExist(phone);

console.log(isUserExist)
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }


    //generate new token

    const newAccessToken = jwtHelpers.createToken(
      {
        phoneNumber: isUserExist.phoneNumber,
        role: isUserExist.role,
        
      },
      config.jwt.secret as Secret,
      config.jwt.expires_in as string

      
    );
    return {
      accessToken: newAccessToken,
    };

}
export const AdminService = {
  createAdmin,
  getAllAdmin,
  loginAdmin,
  refreshToken
  
};