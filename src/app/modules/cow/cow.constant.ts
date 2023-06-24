import { ICategory, ICowlocation, ILabel } from './cow.interface';

export const cowLocation: ICowlocation[] = [
  'Dhaka',
  'Chattogram',
  'Barishal',
  'Rajshahi',
  'Sylhet',
  'Comilla',
  'Rangpur',
  'Mymensingh',
];
export const label: ILabel[] = ['for sale', 'sold out'];
export const category: ICategory[] = ['Dairy', 'Beef', 'DualPurpose'];

export const cowSearchableFields = [
  'searchTerm',
  'location',
  'breed',
  'category',
];
export const cowFilterableFields = [
  'searchTerm',
  'price',
  'location',
  'breed',
  'weight',
  'category',
];
