import { expect, test } from "@playwright/test";

test("resident creates an approved reservation and guest", async ({ page }) => {
  await page.goto("/login");
  await page
    .getByLabel("Correo electrónico")
    .fill("residente@conectaph.local");
  await page.getByLabel("Contraseña").fill("ConectaPH2026!");
  await page.getByRole("button", { name: "Ingresar" }).click();
  await page.getByRole("link", { name: "Zonas comunes" }).click();
  await page.locator("main").getByRole("link").first().click();
  await page.getByRole("link", { name: "Reservar este espacio" }).click();
  await page
    .getByLabel("Fecha")
    .fill(
      new Date(Date.now() + 400 * 86_400_000).toISOString().slice(0, 10),
    );
  await page.getByLabel("Hora de inicio").fill("10:00");
  await page.getByLabel("Motivo").fill("Validación E2E");
  await page.getByLabel("Número de asistentes").fill("4");
  await page.getByRole("button", { name: "Confirmar reserva" }).click();
  await expect(page.getByText(/reserva aprobada automáticamente/i)).toBeVisible();
  await page.getByRole("button", { name: "Agregar invitado" }).click();
  await page.getByLabel("Nombre completo").fill("Invitado E2E");
  await page.getByLabel("Documento").fill(`E2E-${Date.now()}`);
  await page.getByRole("button", { name: "Autorizar invitado" }).click();
  await expect(page.getByText("Invitado E2E")).toBeVisible();
  const reservationId = new URL(page.url()).pathname.split("/").pop();
  await page.evaluate(async (id) => {
    await fetch(`/api/reservations/${id}/cancel`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("conectaph_token")}`,
      },
    });
  }, reservationId);
});
