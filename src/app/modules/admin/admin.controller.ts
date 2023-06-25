import { Request, RequestHandler, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { AdminService } from "./admin.service";


const createAdmin: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const admin = req.body;
    const result = await AdminService.createAdmin(admin);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'user created successfully!',
      data: result,
    });
  }
);

const getAllAdmin: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    
    const result = await AdminService.getAllAdmin();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Get All Admin successfully!',
      data: result,
    });
  }
);

export const AdminController = {
  createAdmin,
  getAllAdmin
  
};