import nats from "node-nats-streaming";
import { randomBytes } from "crypto";
import { TicketCreatedListener } from "./events/ticket-created-listener";
console.clear();
const stan = nats.connect("ticketing", randomBytes(4).toString("hex"), {
  url: "http://localhost:4222",
});

stan.on("connect", () => {
  console.log("Listener connected to NATS");

  stan.on("close", () => {
    console.log("NATS Connection Closeed");
    process.exit();
  });

  new TicketCreatedListener(stan).listen();
});

// Interupt node service
process.on("SIGINT", () => stan.close());
// Close node service
process.on("SIGTERM", () => stan.close());
