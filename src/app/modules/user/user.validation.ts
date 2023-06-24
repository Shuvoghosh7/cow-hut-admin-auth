import { z } from 'zod';
import { userRoll } from './user.constant';

const createUserZodSchema = z.object({
  body: z.object({
    password: z.string(),
    role: z.enum([...userRoll] as [string, ...string[]], {
      required_error: 'Roll is required',
    }),
    name: z.object({
      firstName: z.string({
        required_error: 'First name is required',
      }),
      lastName: z.string({
        required_error: 'Last name is required',
      }),
    }),
    phoneNumber: z.string({
      required_error: 'phoneNumber is required',
    }),
    address: z.string({
      required_error: 'address is required',
    }),
    budget: z.number({
      required_error: 'budget is required',
    }),
    income: z.number({
      required_error: 'income is required',
    }),
  }),
});

export const UserValidation = {
  createUserZodSchema,
};
