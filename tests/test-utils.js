const request = require("supertest");
const app = require("../src/app");

let loginAdminCookie;

module.exports.loginAdmin = async () => {
  if (loginAdminCookie) {
    return loginAdminCookie;
  }

  const res = await request(app).post("/api/v1/sessions").send({
    username: "superadmin",
    password: "superadmin123",
  });

  loginAdminCookie = res.headers["set-cookie"][0];

  return loginAdminCookie;
};
