import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "../../src/app.js";
import { prisma } from "../../src/db.js";

const otherUserId = "00000000-0000-4000-8000-000000000099";
let residentToken = "";
let securityToken = "";
let areaId = "";
let reservationId = "";
let otherReservationId = "";

const login = (email: string, password = "ConectaPH2026!") =>
  request(app).post("/api/auth/login").send({ email, password });

beforeAll(async () => {
  const resident = await login("residente@conectaph.local");
  const security = await login("vigilancia@conectaph.local");
  expect(resident.status).toBe(200);
  expect(security.status).toBe(200);
  residentToken = resident.body.data.token;
  securityToken = security.body.data.token;
  const areas = await request(app)
    .get("/api/common-areas")
    .set("Authorization", `Bearer ${residentToken}`);
  areaId = areas.body.data[0].id;
});

afterAll(async () => {
  if (reservationId)
    await prisma.guest.deleteMany({ where: { reservationId } });
  await prisma.reservation.deleteMany({
    where: { id: { in: [reservationId, otherReservationId].filter(Boolean) } },
  });
  await prisma.user.deleteMany({ where: { id: otherUserId } });
  await prisma.$disconnect();
});

describe("API real con PostgreSQL", () => {
  it("acepta login correcto y rechaza credenciales inválidas", async () => {
    expect((await login("residente@conectaph.local")).status).toBe(200);
    expect(
      (await login("residente@conectaph.local", "incorrecta")).status,
    ).toBe(401);
  });

  it("protege y devuelve la sesión autenticada", async () => {
    expect((await request(app).get("/api/auth/me")).status).toBe(401);
    const response = await request(app)
      .get("/api/auth/me")
      .set("Authorization", `Bearer ${residentToken}`);
    expect(response.status).toBe(200);
    expect(response.body.data.user.email).toBe("residente@conectaph.local");
  });

  it("crea una reserva aprobada y devuelve 409 ante concurrencia", async () => {
    const day = new Date(Date.now() + 30 * 86_400_000)
      .toISOString()
      .slice(0, 10);
    const payload = {
      commonAreaId: areaId,
      startAt: `${day}T10:00:00.000Z`,
      endAt: `${day}T11:00:00.000Z`,
      purpose: "Integración",
      attendeeCount: 2,
    };
    const created = await request(app)
      .post("/api/reservations")
      .set("Authorization", `Bearer ${residentToken}`)
      .send(payload);
    expect(created.status).toBe(201);
    expect(created.body.data.status).toBe("APPROVED");
    reservationId = created.body.data.id;
    const conflict = await request(app)
      .post("/api/reservations")
      .set("Authorization", `Bearer ${residentToken}`)
      .send(payload);
    expect(conflict.status).toBe(409);
  });

  it("registra y consulta invitados propios", async () => {
    const created = await request(app)
      .post(`/api/reservations/${reservationId}/guests`)
      .set("Authorization", `Bearer ${residentToken}`)
      .send({
        firstName: "Invitada",
        lastName: "Integración",
        documentType: "CC",
        documentNumber: `IT-${Date.now()}`,
      });
    expect(created.status).toBe(201);
    const guests = await request(app)
      .get(`/api/reservations/${reservationId}/guests`)
      .set("Authorization", `Bearer ${residentToken}`);
    expect(guests.status).toBe(200);
    expect(guests.body.data).toHaveLength(1);
  });

  it("vigilancia consulta aprobadas y no puede crear reservas", async () => {
    const day = new Date(Date.now() + 30 * 86_400_000)
      .toISOString()
      .slice(0, 10);
    const list = await request(app)
      .get(`/api/security/reservations?date=${day}`)
      .set("Authorization", `Bearer ${securityToken}`);
    expect(list.status).toBe(200);
    expect(
      list.body.data.items.some((item: { id: string }) => item.id === reservationId),
    ).toBe(true);
    const forbidden = await request(app)
      .post("/api/reservations")
      .set("Authorization", `Bearer ${securityToken}`)
      .send({});
    expect(forbidden.status).toBe(403);
  });

  it("residente recibe 403 en administración", async () => {
    const response = await request(app)
      .get("/api/admin/users")
      .set("Authorization", `Bearer ${residentToken}`);
    expect(response.status).toBe(403);
  });

  it("residente no consulta una reserva ajena", async () => {
    const resident = await prisma.user.findUniqueOrThrow({
      where: { email: "residente@conectaph.local" },
    });
    const link = await prisma.userPropertyUnit.findFirstOrThrow({
      where: { userId: resident.id, active: true },
    });
    await prisma.user.upsert({
      where: { id: otherUserId },
      update: {},
      create: {
        id: otherUserId,
        email: "integration.other@conectaph.local",
        firstName: "Otro",
        lastName: "Residente",
        passwordHash: resident.passwordHash,
      },
    });
    const reservation = await prisma.reservation.create({
      data: {
        commonAreaId: areaId,
        residentId: otherUserId,
        propertyUnitId: link.propertyUnitId,
        startAt: new Date(Date.now() + 60 * 86_400_000),
        endAt: new Date(Date.now() + 60 * 86_400_000 + 3_600_000),
        attendeeCount: 1,
        status: "APPROVED",
      },
    });
    otherReservationId = reservation.id;
    const response = await request(app)
      .get(`/api/reservations/${reservation.id}`)
      .set("Authorization", `Bearer ${residentToken}`);
    expect(response.status).toBe(404);
  });
});
