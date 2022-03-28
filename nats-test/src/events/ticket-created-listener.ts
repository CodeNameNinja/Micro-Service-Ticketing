import { Listener, TicketCreatedEvent } from "@channel360/common";
import { Subjects } from "@channel360/common/build/events/subjects";
import nats, { Stan } from "node-nats-streaming";
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
