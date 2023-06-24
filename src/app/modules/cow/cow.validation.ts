import { z } from 'zod';
import { category, cowLocation, label } from './cow.constant';

const createCowZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'name is required',
    }),
    age: z.number({
      required_error: 'Age is required',
    }),
    price: z.number({
      required_error: 'Price is required',
    }),

    location: z.enum([...cowLocation] as [string, ...string[]], {
      required_error: 'location is required',
    }),
    breed: z.string({
      required_error: 'name is required',
    }),

    weight: z.number({
      required_error: 'weight is required',
    }),
    label: z.enum([...label] as [string, ...string[]], {
      required_error: 'label is required',
    }),

    category: z.enum([...category] as [string, ...string[]], {
      required_error: 'category is required',
    }),
    seller: z.string({
      required_error: 'Seller is required',
    }),
  }),
});
const updateCowZodSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    age: z.number().optional(),
    price: z.number().optional(),
    location: z
      .enum([...cowLocation] as [string, ...string[]], {
        required_error: 'location enum value is required',
      })
      .optional(),
    breed: z.string().optional(),
    weight: z.number().optional(),
    label: z
      .enum([...label] as [string, ...string[]], {
        required_error: 'label enum value is required',
      })
      .optional(),

    category: z
      .enum([...category] as [string, ...string[]], {
        required_error: 'category enum value is required',
      })
      .optional(),
  }),
});
export const CowValidation = {
  createCowZodSchema,
  updateCowZodSchema,
};
