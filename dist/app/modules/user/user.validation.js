"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const user_constant_1 = require("./user.constant");
const createUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z.string(),
        role: zod_1.z.enum([...user_constant_1.userRoll], {
            required_error: 'Roll is required',
        }),
        name: zod_1.z.object({
            firstName: zod_1.z.string({
                required_error: 'First name is required',
            }),
            lastName: zod_1.z.string({
                required_error: 'Last name is required',
            }),
        }),
        phoneNumber: zod_1.z.string({
            required_error: 'phoneNumber is required',
        }),
        address: zod_1.z.string({
            required_error: 'address is required',
        }),
        budget: zod_1.z.number({
            required_error: 'budget is required',
        }),
        income: zod_1.z.number({
            required_error: 'income is required',
        }),
    }),
});
exports.UserValidation = {
    createUserZodSchema,
};
