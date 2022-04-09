import { Listener, OrderCreatedEvent, Subjects } from "@channel360/common";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../models/ticket";
import { queueGroupName } from "./queue-group-name";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  readonly subject:Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCreatedEvent["data"], msg:Message) {
    console.log("Event data!", data);
    // find the ticket that the order is reserving. 
    const ticket = await Ticket.findById(data.ticket.id);
    // if no ticket, then throw error.
    if (!ticket) {
      throw new Error("Ticket not found");
    }
    // set the orderId property of the ticket
    ticket.set({ orderId: data.id });
    // save the ticket
    await ticket.save();
    msg.ack();
  }
}