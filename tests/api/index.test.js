const request = require("supertest");
const app = require("../../src/app");
const { loginAdmin } = require("../test-utils");

describe("GET /unknown", () => {
  it("should return 404", async () => {
    const res = await request(app).get("/unknown").send();

    expect(res.statusCode).toBe(404);
  });
});

describe("POST /sessions", () => {
  it("happy case", async () => {
    const res = await request(app).post("/api/v1/sessions").send({
      username: "superadmin",
      password: "superadmin123",
    });

    expect(res.statusCode).toBe(201);
  });
});

describe("GET /users", () => {
  it("happy case", async () => {
    const cookie = await loginAdmin();
    const res = await request(app).get("/api/v1/users").set("Cookie", cookie);
    expect(res.statusCode).toBe(200);
  });
});
