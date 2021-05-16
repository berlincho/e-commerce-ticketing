import { Publisher, Subjects, TicketUpdatedEvent } from '@berlincho/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: TicketUpdatedEvent['subject'] = Subjects.TicketUpdated;
}