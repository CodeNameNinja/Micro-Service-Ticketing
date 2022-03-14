import request from "supertest";
import { app } from "../../app";

// test for invalid input fields
it("fails when an email that does not exist is supplied", async () => {
  await request(app)
    .post("/api/users/signin")
    .send({
      email: "test",
      password: "password",
    })
    .expect(400);
});

// test when incorrect password is supplied
it("fails when no password is supplied", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);

  await request(app)
    .post("/api/users/signin")
    .send({
      email: "test@test.com",
      password: "password23!"
    })
    .expect(400);
});

// test to signin is successful
it("returns a 200 on successful signin", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);

  const response = await request(app)
    .post("/api/users/signin")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(200);
    
    // check for cookie after signin 
    expect(response.get("Set-Cookie")).toBeDefined();
});