const mongoose = require("mongoose");
const User = require("../src/lib/models/user.model");

beforeAll(async () => {
  // Wait for the database connection to be established
  if (mongoose.connection.readyState !== 1) {
    console.log("Waiting for database connection...");

    await new Promise((resolve) => {
      mongoose.connection.on("connected", resolve);
      mongoose.connection.on("open", resolve);
    });
  }

  // Clear the database before all tests
  console.log("Clearing the database before tests...");
  await mongoose.connection.db.dropDatabase();

  await initData();
});

afterAll(async () => {
  // Close all connections
  await mongoose.connection.close();

  // Close all connection pools
  await mongoose.disconnect();
});

async function initData() {
  console.log("Initializing test data...");

  await User.create({
    name: "Super Admin",
    username: "superadmin",
    email: "superadmin@example.com",
    password: "superadmin123",
    bio: "super admin bio",
    birthDate: new Date("1990-11-08"),
    role: "admin",
  });
}
