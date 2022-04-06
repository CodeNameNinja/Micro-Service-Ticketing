import { Subjects, Publisher, OrderCancelledEvent } from "@channel360/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
