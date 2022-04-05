import mongoose from "mongoose";
import request from "supertest";
import { app } from "../../app";
import { Order, OrderStatus } from "../../models/order";
import { Ticket } from "../../models/ticket";
import { natsWrapper } from "../../nats-wrapper";

jest.mock("../../nats-wrapper.ts");
const buildTicket = () => {
  return Ticket.build({
    title: "concert",
    price: 20,
  });
};
it("fetches orders for a particular user", async () => {
  // Create three tickets
  const ticketOne = await buildTicket();
  const ticketTwo = await buildTicket();
  const ticketThree = await buildTicket();

  await ticketOne.save();
  await ticketTwo.save();
  await ticketThree.save();

  const userOne = global.signin();
  const userTwo = global.signin();

  // Create one order as User #1
  const { body: orderOne } = await request(app)
    .post("/api/orders")
    .set("Cookie", userOne)
    .send({ ticketId: ticketOne.id })
    .expect(201);
  const { body: orderTwo } = await request(app)
    .post("/api/orders")
    .set("Cookie", userOne)
    .send({ ticketId: ticketTwo.id })
    .expect(201);

  // Create one order as User #2
  const {body: orderThree } = await request(app)
    .post("/api/orders")
    .set("Cookie", userTwo)
    .send({ ticketId: ticketThree.id })
    .expect(201);

  // Make sure User #1 has one order in the database
  const response = await request(app)
    .get("/api/orders")
    .set("Cookie", userOne)
    .expect(200);

  expect(response.body.length).toEqual(2);  
  expect(response.body[0].id).toEqual(orderOne.id);
  expect(response.body[1].id).toEqual(orderTwo.id);
  expect(response.body[0].ticket.id).toEqual(ticketOne.id);
  expect(response.body[1].ticket.id).toEqual(ticketTwo.id);
  

});
