import { Ticket } from "../../../models/ticket";
import { natsWrapper } from "../../../nats-wrapper";
import { OrderCancelledListener } from "../order-cancelled-listener";
import mongoose from "mongoose";
jest.mock("../../../nats-wrapper.ts")
const setup = async () => {
  const listener = new OrderCancelledListener(natsWrapper.client);
  const ticket = Ticket.build({
    userId: new mongoose.Types.ObjectId().toHexString(),
    title: "concert",
    price: 20,
  });
  await ticket.save();
  const orderId = mongoose.Types.ObjectId().toHexString();
  ticket.set({ orderId });
  await ticket.save();
  const data: any = {
    id: orderId,
    version: 0,
    ticket: {
      id: ticket.id,
    },
  };
  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };
  return { listener, ticket, data, msg };
};

it("unreserves a ticket when the order is cancelled", async () => {
  const { listener, ticket, data, msg } = await setup();
  await listener.onMessage(data, msg);
  const updatedTicket = await Ticket.findById(ticket.id);
  expect(updatedTicket!.orderId).toBeUndefined();
  expect(msg.ack).toHaveBeenCalled();
});
