import { Publisher, OrderCancelledEvent, Subjects } from '@berlincho/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}