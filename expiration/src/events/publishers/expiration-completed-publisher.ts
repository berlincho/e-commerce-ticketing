import { Publisher, ExpirationCompletedEvent, Subjects } from '@berlincho/common';

export class ExpirationCompletedPublisher extends Publisher<ExpirationCompletedEvent> {
  subject: Subjects.ExpirationCompleted = Subjects.ExpirationCompleted;
}