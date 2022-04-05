import { Publisher, OrderCreatedEvent, Subjects} from "@channel360/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent>{
    subject:  Subjects.OrderCreated = Subjects.OrderCreated;
}

