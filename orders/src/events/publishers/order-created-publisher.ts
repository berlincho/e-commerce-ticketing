import { Publisher, OrderCreatedEvent, Subjects } from '@berlincho/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}