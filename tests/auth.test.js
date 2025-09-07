const request = require("supertest");
const app = require("../server");

describe("Auth API", () => {
  it("should return 404 for unknown route", async () => {
    const res = await request(app).get("/unknown");
    expect(res.statusCode).toBe(404);
  });
});
