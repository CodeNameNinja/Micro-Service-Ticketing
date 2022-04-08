import express, { Request, Response } from "express";
import {
  NotAuthorizedError,
  NotFoundError,
  requireAuth,
} from "@channel360/common";
import { Order, OrderStatus } from "../models/order";
import { OrderCancelledPublisher } from "../events/order-cancelled-publisher";
import { natsWrapper } from "../nats-wrapper";
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

    // Send Order Cancel Event.
    new OrderCancelledPublisher(natsWrapper.client).publish({
      id: order.id,
      version: order.version,
      ticket: {
        id: order.ticket.id,
      },
    });


    res.status(204).send(order);
  }
);

export { router as deleteOrderRouter };
