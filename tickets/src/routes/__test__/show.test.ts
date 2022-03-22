import request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../models/ticket";
it.only("returns a 404 status if the ticket is not found", async () => {
  await request(app).get("/api/tickets/1assdfdh").send().expect(404);
});

it("returns the ticket if the ticket is found", async () => {
  const cookie = await global.signin();
  const title = "asdf";
  const price = 20;
  const resposnse = await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({
      title,
      price,
    })
    .expect(201);
  const ticketResponse = await request(app)
    .get(`/api/tickets/${resposnse.body.id}`)
    .send()
    .expect(200);
  expect(ticketResponse.body.title).toEqual(title);
  expect(ticketResponse.body.price).toEqual(price);
});
