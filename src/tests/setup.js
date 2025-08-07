const { clearDB, closeDBConnection } = require("../lib/db");
const User = require("../lib/models/user.model");

beforeAll(async () => {
  await clearDB();

  await User.create({
    _id: "68925421facba30c385230d9",
    name: "Admin",
    username: "admin",
    email: "admin@example.com",
    password: "adminadmin123",
    bio: "admin bio",
    birthDate: new Date("1990-11-08"),
    role: "admin",
  });
});

afterAll(async () => {
  await closeDBConnection();
});
