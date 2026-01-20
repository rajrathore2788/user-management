const request = require("supertest");
const app = require("../server");
jest.setTimeout(20000);

describe("AUTH TESTS", () => {
  // TC1

  // TC2
  test("Login fails with wrong password", async () => {
    const res = await request(app).post("/login").send({
      email: "admin@test.com",
      password: "wrongpassword",
    });

    expect(res.text).toContain("Invalid credentials");
  });

  // TC4
  test("Register fails with missing fields", async () => {
    const res = await request(app).post("/register").send({
      email: "",
      password: "",
    });

    expect(res.text).toContain("All fields required");
  });

  // TC5
  test("Register fails with existing email", async () => {
    // First registration (success)
    await request(app).post("/register").send({
      username: "admin",
      email: "admin@test.com",
      password: "123456",
    });

    // Second registration (should fail)
    const res = await request(app).post("/register").send({
      username: "admin2",
      email: "admin@test.com",
      password: "123456",
    });

    expect(res.text).toContain("Email already registered");
  });
});
