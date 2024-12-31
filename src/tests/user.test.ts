import { describe, it, expect, vi } from "vitest";
import request from "supertest";
import { app } from "..";
import { prisma } from "../__mocks__/db";
vi.mock("../db");
describe("Register /Post", () => {
  it("should return status code 200 and message user registered successfully", async () => {
    prisma.user.create.mockResolvedValue({
      id: "1",
      username: "shivansh",
      email: "shivneeraj2004@gmail.com",
    });
    const res = await request(app).post("/register").send({
      username: "shivansh",
      email: "shivneeraj2004@gmail.com",
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("user registered successfully");
  });
});
