import { Message } from "node-nats-streaming";
import { Subjects, Listener, TicketUpdatedEvent, NotFoundError} from "@channel360/common";
import { Ticket } from "../../models/ticket";
import { queueGroupName } from "./queue-group-name";

export class TicketUpdatedListener extends Listener<TicketUpdatedEvent> {
  readonly subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
  queueGroupName = queueGroupName;

  async onMessage(data: TicketUpdatedEvent["data"], msg: Message) {
    const ticket = await Ticket.findById(data.id);

    if (!ticket) {
      throw new NotFoundError();
    }

    ticket.set({
      title: data.title,
      price: data.price,
    });
    
    await ticket.save();

    msg.ack();
  } 
}