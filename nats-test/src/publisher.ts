import nats from "node-nats-streaming";
console.clear();
const stan = nats.connect("ticketing", "abc", { url: "http://localhost:4222" });

stan.on('connect', () => {
  console.log('Publisher connected to NATS');

  stan.publish('ticket:created', JSON.stringify({
    id: '123',
    title: 'concert',
    price: 20
  }));

  stan.publish('ticket:created', JSON.stringify({
    id: '124',
    title: 'concert',
    price: 20
  }));

  stan.on('publish', () => {
    console.log('Event published!');
  })
})