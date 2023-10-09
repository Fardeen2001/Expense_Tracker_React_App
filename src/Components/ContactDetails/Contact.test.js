import "@testing-library/jest-dom/extend-expect";

describe("contact", () => {
  test("fetching", async () => {
    window.fetch = jest.fn();
    window.fetch.mockResolvedValueOnce({
      json: async () => [{ name: "Fardeen", url: "fardeen.jpeg" }],
    });
  });
});
