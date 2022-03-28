export const natsWrapper = {
  client: {
    publish: jest.fn().mockImplementation(() => Promise.resolve()),
  },
}