import { z } from 'zod';
import { adminRoll } from './admin.constant';


const createAdminZodSchema = z.object({
  body: z.object({
    phoneNumber: z.string({
      required_error: 'phoneNumber is required',
    }),
    password: z.string(),
    role: z.enum([...adminRoll] as [string, ...string[]], {
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
    address: z.string({
      required_error: 'address is required',
    }),
  }),
});

export const AdminValidation = {
  createAdminZodSchema,
};
