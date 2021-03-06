const supertest = require("supertest");
const server = require("../api/server");
const db = require("../database/dbConfig");
const jwt = require("jsonwebtoken");
const Howtodos = require("../howtodos/howtodos-model");

beforeEach(async () => {
	await db.seed.run();
});
//
// afterAll(async () => {
//     await db.destroy()
// })

describe("Authentication Router Integration Tests", () => {
	it("GET /api/auth - Authentication router is working", async () => {
		const res = await supertest(server).get("/api/auth");
		expect(res.statusCode).toBe(200);
		expect(res.headers["content-type"]).toBe("application/json; charset=utf-8");
		expect(res.body.message).toBe("Authentication router is live");
	});
	it("POST /api/auth/register - Account registration is working", async () => {
		jest.setTimeout(30000); //on slow computers you may need more time for the callback function to work.
		const res = await supertest(server).post("/api/auth/register").send({
			email: "Test User 1",
			password: "testpassword",
		});
		expect(res.statusCode).toBe(201);
		expect(res.headers["content-type"]).toBe("application/json; charset=utf-8");
		expect(res.body.email).toBe("Test User 1");
	});
	it("POST /api/auth/login - Account login requires credentials", async () => {
		jest.setTimeout(30000);
		const res = await supertest(server).post("/api/auth/login").send({
			email: "nothing",
			password: "alsonothing",
		});
		expect(res.statusCode).toBe(400);
		expect(res.headers["content-type"]).toBe("application/json; charset=utf-8");
		expect(res.body.message).toBe(`Invalid Credentials`);
	});
	it("POST /api/auth/login - Account login successful", async () => {
		jest.setTimeout(30000);
		const r = await supertest(server).post("/api/auth/register").send({
			email: "Test User 2",
			password: "TestPassword",
		});
		const res = await supertest(server).post("/api/auth/login").send({
			email: "Test User 2",
			password: "TestPassword",
		});
		const secret = process.env.JWT_SECRET;
		const payload = {
			userId: 1,
			email: "Test User 2",
			userRole: "normal",
		};
		const token = jwt.sign(payload, secret);
		console.log(res.body);
		expect(res.statusCode).toBe(200);
		expect(res.headers["content-type"]).toBe("application/json; charset=utf-8");
		expect(res.body.token).toEqual(token);
	});
});
describe("Howtodos Router Integration Tests", () => {
	it("GET /api/howtodos - Fails without authentication", async () => {
		const res = await supertest(server).get("/api/howtodos");
		expect(res.statusCode).toBe(400);
		expect(res.headers["content-type"]).toBe("application/json; charset=utf-8");
	});
	it("GET /api/howtodos - Succeeds with authentication", async () => {
		jest.setTimeout(30000);
		const r = await supertest(server).post("/api/auth/register").send({
			email: "Test User 2",
			password: "TestPassword",
		});
		const re = await supertest(server).post("/api/auth/login").send({
			email: "Test User 2",
			password: "TestPassword",
		});
		const secret = process.env.JWT_SECRET;
		const payload = {
			userId: 1,
			email: "Test User 2",
			userRole: "normal",
		};
		const token = jwt.sign(payload, secret);
		const res = await supertest(server)
			.get("/api/howtodos")
			.set("Authorization", token);

		expect(res.statusCode).toBe(200);
		expect(res.headers["content-type"]).toBe("application/json; charset=utf-8");
		expect.arrayContaining(res.body);
	});

	it("POST /api/howtodos - Succeeds with authentication", async () => {
		jest.setTimeout(30000);
		const r = await supertest(server).post("/api/auth/register").send({
			email: "Test User 2",
			password: "TestPassword",
		});
		const re = await supertest(server).post("/api/auth/login").send({
			email: "Test User 2",
			password: "TestPassword",
		});
		const secret = process.env.JWT_SECRET;
		const payload = {
			userId: 1,
			email: "Test User 2",
			userRole: "normal",
		};
		const token = jwt.sign(payload, secret);
		const res = await supertest(server)
			.post("/api/howtodos")
			.set("Authorization", token)
			.send({
				title: "Test",
				author: "Author",
				description: "Test test test",
			});

		expect(res.statusCode).toBe(201);
		expect(res.headers["content-type"]).toBe("application/json; charset=utf-8");
		expect.arrayContaining(res.body);
	});

	it("PUT /api/howtodos/:id - Succeeds with authentication", async () => {
		jest.setTimeout(30000);
		const r = await supertest(server).post("/api/auth/register").send({
			email: "Test User 2",
			password: "TestPassword",
		});
		const re = await supertest(server).post("/api/auth/login").send({
			email: "Test User 2",
			password: "TestPassword",
		});
		const secret = process.env.JWT_SECRET;
		const payload = {
			userId: 1,
			email: "Test User 2",
			userRole: "normal",
		};
		const token = jwt.sign(payload, secret);

		const howtodos = await Howtodos.find().first();

		const res = await supertest(server)
			.put(`/api/howtodos/${howtodos.id}`)
			.set("Authorization", token)
			.send({
				title: "Test2",
				author: "test",
				description: "descrtiption",
			});

		expect(res.statusCode).toBe(200);
		expect(res.headers["content-type"]).toBe("application/json; charset=utf-8");
		expect.arrayContaining(res.body);
	});

	it("DELETE /api/howtodos/:id - Succeeds with authentication", async () => {
		jest.setTimeout(30000);
		const r = await supertest(server).post("/api/auth/register").send({
			email: "Test User 2",
			password: "TestPassword",
		});
		const re = await supertest(server).post("/api/auth/login").send({
			email: "Test User 2",
			password: "TestPassword",
		});
		const secret = process.env.JWT_SECRET;
		const payload = {
			userId: 1,
			email: "Test User 2",
			userRole: "normal",
		};
		const token = jwt.sign(payload, secret);

		const howtodos = await Howtodos.find().first();

		const res = await supertest(server)
			.del(`/api/howtodos/${howtodos.id}`)
			.set("Authorization", token);

		expect(res.statusCode).toBe(200);
		expect(res.headers["content-type"]).toBe("application/json; charset=utf-8");
	});
});
