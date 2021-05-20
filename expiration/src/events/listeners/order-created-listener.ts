import { Listener, OrderCreatedEvent, Subjects } from '@berlincho/common';
import { Message } from 'node-nats-streaming';
import { queueGroupName } from './queue-group-name';
import { expirationQueue } from '../../queues/expiration-queue';
import { ExpirationCompletedPublisher } from '../publishers/expiration-completed-publisher';
import { natsWrapper } from '../../nats-wrapper';

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
    const delay = new Date(data.expiresAt).getTime() - new Date().getTime();
    console.log('Waiting this many milliseconds to process the job:', delay);

    await expirationQueue.add({
      orderId: data.id
    }, {
      delay: delay,
    });

    new ExpirationCompletedPublisher(this.client).publish({
      orderId: data.id,
    });

    msg.ack();
  };
}