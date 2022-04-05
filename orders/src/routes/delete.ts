import express, { Request, Response } from "express";
import {
  NotAuthorizedError,
  NotFoundError,
  requireAuth,
} from "@channel360/common";
import { Order, OrderStatus } from "../models/order";
const router = express.Router();

router.delete(
  "/api/orders/:orderId",
  requireAuth,
  async (req: Request, res: Response) => {
    const order = await Order.findById(req.params.orderId);
    // Set status of order to Cancelled.
    if (!order) {
      throw new NotFoundError();
    } else if (order.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    order.status = OrderStatus.Cancelled;
    await order.save();
    res.status(204).send(order);
  }
);

export { router as deleteOrderRouter };
