import express, { Request, Response } from "express";
import { NotAuthorizedError, NotFoundError, requireAuth, validateRequest, BadRequestError } from "@channel360/common";
import { body } from "express-validator";
import { Ticket } from "../models/ticket";
import { TicketUpdatedPublisher } from "../events/publishers/ticket-updated-publisher";
import { natsWrapper } from "../nats-wrapper";
const router = express.Router();

// Update Ticket
router.put(
  "/api/tickets/:id",
  requireAuth,
  [
    body("title")
      .not()
      .isEmpty()
      .withMessage("Title is required"),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price must be provided and must be greater than 0"),
  ],  
  validateRequest,
  async (req: Request, res: Response) => {
    const { title, price } = req.body;
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      throw new NotFoundError();
    }
    if (ticket.orderId) {
      throw new BadRequestError("Cannot edit a reserved ticket");
    }
    if(ticket.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }
    
    ticket.set({ title, price });
    await ticket.save();
    new TicketUpdatedPublisher(natsWrapper.client).publish({
      id: ticket.id,
      title: ticket.title,
      price: ticket.price,
      userId: ticket.userId,
      version: ticket.version
    });

    res.send(ticket);
  }
);

export { router as updateTicketRouter };