
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
