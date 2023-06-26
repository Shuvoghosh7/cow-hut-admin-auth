import { SortOrder } from 'mongoose';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { userSearchableFields } from './user.constant';
import { IUser, IUserFilters } from './user.interface';
import { User } from './user.model';
import { ILoginUser, IRefreshTokenResponse } from '../auth/auth.interface';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import config from '../../../config';
import { Secret } from 'jsonwebtoken';

const createUser = async (user: IUser): Promise<IUser | null> => {
  const result = await User.create(user);
  return result;
};

const loginUser = async (payload: ILoginUser) => {
  const { phoneNumber,password } = payload;
  const isUserExist = await User.isUserExist(phoneNumber)
  console.log(isUserExist)
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }
  if (
    isUserExist.password &&
    !(await User.isPasswordMatched(password, isUserExist.password))
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
  const isUserExist = await User.isUserExist(phone);

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
const getAlluser = async (
  filters: IUserFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IUser[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      $or: userSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }
  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await User.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await User.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findById(id);
  return result;
};

const updateUser = async (
  id: string,
  payload: Partial<IUser>
): Promise<IUser | null> => {
  const result = await User.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findByIdAndDelete(id);
  return result;
};

export const UserService = {
  createUser,
  getAlluser,
  getSingleUser,
  updateUser,
  deleteUser,
  loginUser,
  refreshToken
  
};
