const request = require("supertest");
const app = require("../app");

let adminCookie;

module.exports.adminLogin = async () => {
  if (adminCookie) {
    return adminCookie;
  }

  console.log("login admin for admin cookie");

  const loginResponse = await request(app).post("/api/v1/sessions").send({
    username: "admin",
    password: "adminadmin123",
  });

  adminCookie = loginResponse.headers["set-cookie"][0];

  return adminCookie;
};
