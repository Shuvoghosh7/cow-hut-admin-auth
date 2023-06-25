import { Request, RequestHandler, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { OrderService } from './order.services';
import { IOrder } from './order.interface';

const createOrder: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const order: IOrder  = req.body;
    const result = await OrderService.createOrder(order);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Order Complete successfully!',
      data: result,
    });
  }
);
const getAllOrder: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    
    const result = await OrderService.getAllOrder();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Get All Order successfully!',
      data: result,
    });
  }
);

export const orderController = {
  createOrder,
  getAllOrder,
};
