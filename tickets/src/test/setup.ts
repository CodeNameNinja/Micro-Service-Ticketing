import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
let mongo: any;
declare global {
  var signin: () => string[];
}
beforeAll(async () => {
  process.env.JWT_KEY = "asdfasdf";
  process.env.NODE_ENV = "test";
  mongo = new MongoMemoryServer();
  await mongo.start();
  const mongoUri = await mongo.getUri();
  await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

// faking Auth for testing.
global.signin = () => {
  const email = "test@test.com"
  const password = "password"

  // Build a JWT payload. {id, email}
  const payload = {
    id: mongoose.Types.ObjectId().toHexString(),
    email: "test@test.com"
  }
  // Create a JWT!
  const token = jwt.sign(payload, process.env.JWT_KEY!);
  // Build a session object { jwt: MY_JWT }
  const session = { jwt: token };
  // Take JSON and encode it as base64
  const sessionJSON = JSON.stringify(session);
  // return a string thats the cookie with the encoded data
  const sessionBase64 = Buffer.from(sessionJSON).toString('base64');
  // return a string thats the cookie with the encoded data
  return [`express:sess=${sessionBase64}`];
}