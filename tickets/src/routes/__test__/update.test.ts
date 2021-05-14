import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';

it('returns a 404 if the provided id does not exist', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${id}`)
    .set('Cookie', global.signin())
    .send({
      title: 'asdasdasd',
      price: 20
    })
    .expect(404);
});

it('returns a 401 if the user is not authorized', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${id}`)
    .send({
      title: 'asdasdasd',
      price: 20
    })
    .expect(401);
});

it('returns a 401 if the user does not own the ticket', async () => {
  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      title: 'asdasd',
      price: 20,
    });
  
  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', global.signin())
    .send({
      title: 'asdasdasd',
      price: 1000,
    })
    .expect(401);
  
});

it('returns a 400 if the user provides an invalid title or price', async () => {
  const cookie = global.signin();

  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', cookie)
    .send({
      title: 'asdasda',
      price: 20,
    });
  
  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: '', // invalid title
      price: 20,
    })
    .expect(400);
  
  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: 'asdasdasdcc', 
      price: -20, // invalid price
    })
    .expect(400);
});

it('updates the ticket provided the valid input', async () => {
  const cookie = global.signin();

  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', cookie)
    .send({
      title: 'asdasda',
      price: 20,
    });
  
  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: 'asdasdasd',
      price: 200,
    })
    .expect(200);
  
  const ticketResponse = await request(app)
    .get(`/api/tickets/${response.body.id}`)
    .send();
  
  console.log(ticketResponse.body.title);

  expect(ticketResponse.body.title).toEqual('asdasdasd');
  expect(ticketResponse.body.price).toEqual(200);
});