
import { test, expect } from '@playwright/test';

test('all target="_blank" links should have rel="noopener noreferrer"', async ({ page }) => {
  await page.goto('http://localhost:4321/', { waitUntil: 'networkidle' });

  const staticLinks = page.locator('a[target="_blank"]');
  const count = await staticLinks.count();
  console.log(`Found ${count} links with target="_blank"`);

  for (let i = 0; i < count; i++) {
    const href = await staticLinks.nth(i).getAttribute('href');
    const rel = await staticLinks.nth(i).getAttribute('rel');

    // Skip dev-related links (Astro dev toolbar, etc.)
    if (href?.includes('astro.build') || href?.includes('github.com/withastro')) {
      console.log(`Skipping dev-related link: ${href}`);
      continue;
    }

    console.log(`Checking link ${i}: href=${href}, rel=${rel}`);
    expect(rel, `Link to ${href} is missing rel="noopener noreferrer"`).not.toBeNull();
    expect(rel).toContain('noopener');
    expect(rel).toContain('noreferrer');
  }

  // Check modal links
  const serviceCards = page.locator('.service-card');
  const cardCount = await serviceCards.count();
  if (cardCount > 0) {
    await serviceCards.first().click();
    const modalCta = page.locator('#modal-cta');
    await expect(modalCta).toBeVisible();
    const rel = await modalCta.getAttribute('rel');
    const href = await modalCta.getAttribute('href');
    console.log(`Modal CTA: href=${href}, rel=${rel}`);
    expect(rel).not.toBeNull();
    expect(rel).toContain('noopener');
    expect(rel).toContain('noreferrer');
  }
});

test('emergency CTA link is sanitized and has rel="noopener noreferrer"', async ({ page }) => {
  await page.goto('http://localhost:4321/', { waitUntil: 'networkidle' });

  const emergenciaCta = page.locator('#emergencia-cta');
  await expect(emergenciaCta).toBeVisible();

  const href = await emergenciaCta.getAttribute('href');
  const rel = await emergenciaCta.getAttribute('rel');

  expect(rel).toContain('noopener');
  expect(rel).toContain('noreferrer');
  expect(href).toMatch(/^https:\/\/wa\.me\/\d+(\?.*)?$/);
});

test('ticket status page sanitizes XSS payloads in history response', async ({ page }) => {
  await page.route('**/webhook/techhealth-estado*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        success: true,
        ticket: {
          ticket_number: 'TH-2026-XSS',
          nombre: 'Cliente Prueba',
          servicio: 'Mantenimiento',
          tecnico: '<script>alert("xss")</script>',
          created_at: '2026-03-01T10:00:00Z',
          estado: 'diagnostico',
          estado_descripcion: 'En revisión'
        },
        historial: [
          {
            estado_anterior: 'recepcion',
            estado_nuevo: 'diagnostico',
            fecha: '2026-03-01T11:00:00Z',
            tecnico: '<img src=x onerror=alert(1)>',
            nota: '<script>alert("xss_nota")</script><b>Bold Note</b>'
          }
        ]
      })
    });
  });

  await page.goto('http://localhost:4321/estado');
  await page.fill('#ticket-input', 'TH-2026-XSS');
  await page.click('#estado-submit');

  await expect(page.locator('#estado-result')).toBeVisible();

  const historialHtml = await page.innerHTML('#result-historial');
  expect(historialHtml).not.toContain('<script>');
  expect(historialHtml).not.toContain('<img src=x');
  expect(historialHtml).toContain('&lt;script&gt;');
});

test('ticket status page gracefully handles 500 HTTP error response', async ({ page }) => {
  await page.route('**/webhook/techhealth-estado*', async (route) => {
    await route.fulfill({
      status: 500,
      contentType: 'text/html',
      body: '<html><body>500 Internal Server Error</body></html>'
    });
  });

  await page.goto('http://localhost:4321/estado');
  await page.fill('#ticket-input', 'TH-2026-ERR');
  await page.click('#estado-submit');

  const errorDiv = page.locator('#estado-error');
  await expect(errorDiv).toBeVisible();
  await expect(errorDiv).toContainText('Error de servidor (500)');
});

test('ticket status page enforces maxlength and truncates oversized inputs', async ({ page }) => {
  let requestedTicket = '';
  await page.route('**/webhook/techhealth-estado*', async (route) => {
    const url = new URL(route.request().url());
    requestedTicket = url.searchParams.get('ticket_number') || '';
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        success: true,
        ticket: {
          ticket_number: requestedTicket,
          nombre: 'Cliente Test',
          servicio: 'Diagnostico',
          created_at: '2026-03-01T10:00:00Z',
          estado: 'recepcion'
        }
      })
    });
  });

  await page.goto('http://localhost:4321/estado');
  const ticketInput = page.locator('#ticket-input');
  await expect(ticketInput).toHaveAttribute('maxlength', '30');

  const oversizedTicket = 'TH-2026-' + 'A'.repeat(50);
  await ticketInput.fill(oversizedTicket);
  await page.click('#estado-submit');

  expect(requestedTicket.length).toBeLessThanOrEqual(30);
  expect(requestedTicket).toBe(('TH-2026-' + 'A'.repeat(50)).slice(0, 30));
});

test('contact form submission truncates oversized field inputs in payload', async ({ page }) => {
  let capturedPayload: any = null;
  await page.route('**/webhook/techhealth-solicitud*', async (route) => {
    capturedPayload = JSON.parse(route.request().postData() || '{}');
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ success: true, ticket_number: 'TH-2026-TEST' })
    });
  });

  await page.goto('http://localhost:4321/#contacto');

  const nameInput = page.locator('#f-nombre');
  const telInput = page.locator('#f-tel');
  const descInput = page.locator('#f-desc');

  const oversizedName = 'Juan ' + 'A'.repeat(150);
  const oversizedTel = '+54 9 381 ' + '1'.repeat(50);
  const oversizedMsg = 'Consulta: ' + 'M'.repeat(600);

  await nameInput.fill(oversizedName);
  await telInput.fill(oversizedTel);
  await descInput.fill(oversizedMsg);

  await page.click('#f-submit');

  await page.waitForTimeout(500);

  expect(capturedPayload).not.toBeNull();
  expect(capturedPayload.nombre.length).toBeLessThanOrEqual(100);
  expect(capturedPayload.telefono.length).toBeLessThanOrEqual(20);
  expect(capturedPayload.mensaje.length).toBeLessThanOrEqual(500);
});
