const request = require("supertest");

const app = require("../../app");
const { adminLogin } = require("../utils");

describe("CRUD users", function () {
  it("GET /users happy case", async function () {
    const cookie = await adminLogin();

    const response = await request(app)
      .get("/api/v1/users")
      .set("Cookie", cookie);

    expect(response.status).toEqual(200);
  });

  it("GET /users 401", async function () {
    const response = await request(app).get("/api/v1/users");

    expect(response.status).toEqual(401);
  });

  it("GET /users/:id happy case", async function () {
    const cookie = await adminLogin();

    const response = await request(app)
      .get("/api/v1/users/68925421facba30c385230d9")
      .set("Cookie", cookie);

    expect(response.status).toEqual(200);
  });

  it("GET /users/me return cookie user", async function () {
    const cookie = await adminLogin();

    const response = await request(app)
      .get("/api/v1/users/me")
      .set("Cookie", cookie);

    expect(response.status).toEqual(200);

    expect(response.body).toEqual({
      name: "Admin",
      username: "admin",
      email: "admin@example.com",
      bio: "admin bio",
      birthDate: "1990-11-08T00:00:00.000Z",
      role: "admin",
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
      id: "68925421facba30c385230d9",
    });
  });
});
