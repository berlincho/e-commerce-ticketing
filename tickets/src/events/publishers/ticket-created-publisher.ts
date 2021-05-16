import { Publisher, Subjects, TicketCreatedEvent } from '@berlincho/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: TicketCreatedEvent['subject'] = Subjects.TicketCreated;
}