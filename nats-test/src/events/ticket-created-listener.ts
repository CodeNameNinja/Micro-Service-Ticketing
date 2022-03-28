import nats, { Stan } from "node-nats-streaming";
import { Listener } from "./base-listener";
import { TicketCreatedEvent } from "./ticket-created-event";
import { Subjects } from "./subjects";
export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
  queueGroupName = "order-service-queue-group";
  onMessage(data: TicketCreatedEvent["data"], message: nats.Message): void {
    console.log("Event Data: ", data);

    message.ack();
  }

  constructor(client: Stan) {
    super(client);
  }
}
