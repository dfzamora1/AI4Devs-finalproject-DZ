import { expect, test } from '@playwright/test';

test('resident creates an approved reservation and guest', async ({ page }) => {
  await page.goto('/login');
  await page.getByLabel('Correo').fill('residente@conectaph.local');
  await page.getByLabel('Contraseña').fill('ConectaPH2026!');
  await page.getByRole('button', { name: 'Ingresar' }).click();
  await page.getByRole('link', { name: 'Zonas comunes' }).click();
  await page.locator('[data-testid="common-area-card"]').first().click();
  await page.getByLabel('Fecha').fill(new Date(Date.now() + 7 * 86400000).toISOString().slice(0, 10));
  await page.getByLabel('Hora de inicio').fill('10:00');
  await page.getByLabel('Hora de fin').fill('11:00');
  await page.getByLabel('Asistentes').fill('4');
  await page.getByRole('button', { name: 'Reservar' }).click();
  await expect(page.getByText(/aprobada/i)).toBeVisible();
  await page.getByLabel('Nombre del invitado').fill('Invitado E2E');
  await page.getByLabel('Documento').fill(`E2E-${Date.now()}`);
  await page.getByRole('button', { name: 'Agregar invitado' }).click();
  await expect(page.getByText('Invitado E2E')).toBeVisible();
});
