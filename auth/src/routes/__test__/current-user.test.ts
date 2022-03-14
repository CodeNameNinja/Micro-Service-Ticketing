import request from "supertest";
import { app } from "../../app";

// response with details about the current user
it("responds with details about the current user", async () => {
  // const cookie = await global.signin();

  //signup user
  const authResponse = await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);

  const cookie = authResponse.get("Set-Cookie");

  //signin user
  await request(app)
    .post("/api/users/signin")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(200);

  //get current user
  const response = await request(app)
    .get("/api/users/currentuser")
    .set("Cookie", cookie)
    .send()
    .expect(200);

  expect(response.body.currentUser.email).toEqual("test@test.com");
});
