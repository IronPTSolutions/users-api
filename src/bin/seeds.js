const { faker } = require("@faker-js/faker");
const User = require("../lib/models/user.model");
const Address = require("../lib/models/address.model");
const { clearDB, closeDBConnection } = require("../lib/db");

console.log("seed");

async function run() {
  await clearDB();

  await User.create({
    name: "Admin",
    username: "admin",
    email: "admin@example.com",
    password: "adminadmin123",
    bio: faker.person.bio().substring(0, 500),
    birthDate: faker.date.birthdate({ min: 13, max: 100, mode: "age" }),
    role: "admin",
  });

  console.log("user created admin");

  for (let i = 0; i < 10; i++) {
    const user = await User.create({
      name: faker.person.fullName(),
      username: faker.internet.username().toLowerCase().substring(0, 20),
      email: faker.internet.email().toLowerCase(),
      password: faker.internet.password({ length: 8 }),
      bio: faker.person.bio().substring(0, 500),
      birthDate: faker.date.birthdate({ min: 13, max: 100, mode: "age" }),
    });

    console.log("user created", user.username);

    for (let j = 0; j < 3; j++) {
      await Address.create({
        name: faker.location.streetAddress({ useFullAddress: false }),
        num: faker.location.buildingNumber(),
        zipCode: faker.location.zipCode("#####"), // Exactamente 5 dígitos
        town: faker.location.city(),
        region: faker.location.state(),
        user: user._id,
      });
    }
  }

  console.log("Exit DB connection");

  await closeDBConnection();
}

run();
