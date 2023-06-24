"use strict";
// import mongoose from 'mongoose';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const cow_modal_1 = require("../cow/cow.modal");
const user_model_1 = require("../user/user.model");
const order_module_1 = require("./order.module");
const createOrder = (order) => __awaiter(void 0, void 0, void 0, function* () {
    const buyer = yield user_model_1.User.findById(order.buyer);
    const cow = yield cow_modal_1.Cow.findById(order.cow);
    if (!buyer) {
        throw new Error("Buyer not found");
    }
    if (!cow) {
        throw new Error("Cow not found");
    }
    if (buyer.budget < cow.price) {
        throw new Error('Insufficient funds to buy the cow.');
    }
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    yield cow_modal_1.Cow.findByIdAndUpdate(order.cow, { label: 'sold out' });
    // Deduct the cost of the cow from the buyer's budget
    yield user_model_1.User.findByIdAndUpdate(order.buyer, {
        budget: buyer.budget - cow.price,
    });
    // Update the seller's income by adding the cost of the cow
    const sellerId = cow.seller._id;
    const cowPrice = cow.price;
    yield user_model_1.User.updateOne({ _id: sellerId }, { $inc: { income: cowPrice } });
    const result = yield order_module_1.Order.create(order);
    yield session.commitTransaction();
    session.endSession();
    return result;
});
const getAllOrder = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_module_1.Order.find().populate("cow").populate("buyer");
    return result;
});
exports.OrderService = {
    createOrder,
    getAllOrder,
};
