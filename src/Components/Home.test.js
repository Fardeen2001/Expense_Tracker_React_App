import "@testing-library/jest-dom/extend-expect";

describe("Home", () => {
  test("fetching", async () => {
    window.fetch = jest.fn();
    window.fetch.mockResolvedValueOnce({
      json: async () => [{ id: "p1", price: 300 }],
    });
  });
});
