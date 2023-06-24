"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CowValidation = void 0;
const zod_1 = require("zod");
const cow_constant_1 = require("./cow.constant");
const createCowZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: 'name is required',
        }),
        age: zod_1.z.number({
            required_error: 'Age is required',
        }),
        price: zod_1.z.number({
            required_error: 'Price is required',
        }),
        location: zod_1.z.enum([...cow_constant_1.cowLocation], {
            required_error: 'location is required',
        }),
        breed: zod_1.z.string({
            required_error: 'name is required',
        }),
        weight: zod_1.z.number({
            required_error: 'weight is required',
        }),
        label: zod_1.z.enum([...cow_constant_1.label], {
            required_error: 'label is required',
        }),
        category: zod_1.z.enum([...cow_constant_1.category], {
            required_error: 'category is required',
        }),
        seller: zod_1.z.string({
            required_error: 'Seller is required',
        }),
    }),
});
const updateCowZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        age: zod_1.z.number().optional(),
        price: zod_1.z.number().optional(),
        location: zod_1.z
            .enum([...cow_constant_1.cowLocation], {
            required_error: 'location enum value is required',
        })
            .optional(),
        breed: zod_1.z.string().optional(),
        weight: zod_1.z.number().optional(),
        label: zod_1.z
            .enum([...cow_constant_1.label], {
            required_error: 'label enum value is required',
        })
            .optional(),
        category: zod_1.z
            .enum([...cow_constant_1.category], {
            required_error: 'category enum value is required',
        })
            .optional(),
    }),
});
exports.CowValidation = {
    createCowZodSchema,
    updateCowZodSchema,
};
