import { Publisher, TicketCreatedEvent, Subjects } from "@channel360/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
