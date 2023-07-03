// import mongoose from 'mongoose';

import mongoose, { Types } from 'mongoose';
import { Cow } from '../cow/cow.modal';
import { User } from '../user/user.model';
import { IOrder } from './order.interface';

import { Order } from './order.module';

type CowModel = {
  price: number;
  seller: Types.ObjectId;
};
const createOrder = async (order: IOrder) => {
  const buyer = await User.findById(order.buyer);
  const cow = await Cow.findById<CowModel>(order.cow);
  if (!buyer) {
    throw new Error('Buyer not found');
  }
  if (!cow) {
    throw new Error('Cow not found');
  }

  if (buyer.budget < cow.price) {
    throw new Error('Insufficient funds to buy the cow.');
  }

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    await Cow.findByIdAndUpdate(order.cow, { label: 'sold out' });

    // Deduct the cost of the cow from the buyer's budget
    await User.findByIdAndUpdate(order.buyer, {
      budget: buyer.budget - cow.price,
    });
    // Update the seller's income by adding the cost of the cow
    const sellerId = cow.seller._id;
    const cowPrice = cow.price;
    await User.updateOne({ _id: sellerId }, { $inc: { income: cowPrice } });
    const result = await Order.create(order);

    await session.commitTransaction();
    await session.endSession();

    return result;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
};

const getAllOrder = async () => {
  const result = await Order.find().populate('cow').populate('buyer');
  return result;
};

export const OrderService = {
  createOrder,
  getAllOrder,
};
