const request = require("supertest");
const app = require("../server");
jest.setTimeout(20000);

describe("USER / ADMIN TESTS", () => {
  // TC7
  test("Dashboard access without login fails", async () => {
    const res = await request(app).get("/dashboard");
    expect(res.header.location).toContain("/login?error=Please");
  });

  // TC8
  test("User cannot access admin route", async () => {
    const res = await request(app).get("/admin");
    expect(res.statusCode).toBe(302);
  });

  // TC13
  test("Edit user with invalid ID fails", async () => {
    const res = await request(app).post("/users/123/edit").send({
      username: "test",
      email: "test@test.com",
      role: "user",
    });

    expect(res.statusCode).toBe(302);
  });

  // TC14
  test("Edit user fails with short username", async () => {
    const res = await request(app).post("/users/123/edit").send({
      username: "ab",
      email: "test@test.com",
      role: "user",
    });

    expect(res.header.location).toContain("error");
  });

  // TC16
  test("Edit user fails with invalid role", async () => {
    const res = await request(app).post("/users/123/edit").send({
      username: "validname",
      email: "test@test.com",
      role: "superadmin",
    });

    expect(res.header.location).toContain("error");
  });
});
