import { Publisher, Subjects, TicketUpdatedEvent } from "@channel360/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
