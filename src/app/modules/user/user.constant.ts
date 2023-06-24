import { IUserRoll } from './user.interface';

export const userRoll: IUserRoll[] = ['seller', 'buyer'];

export const userSearchableFields = ['role', 'name', 'address'];

export const userFilterableFields = ['searchTerm', 'role', 'name', 'address'];
