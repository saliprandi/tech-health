import { test, expect } from '@playwright/test';

test.describe('NEW Sections: Cotizador B2B & Cobertura NOA', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4321/');
  });

  test('Cotizador B2B should calculate estimation summary and update WhatsApp link', async ({ page }) => {
    const cotizadorSection = page.locator('#cotizador');
    await cotizadorSection.scrollIntoViewIfNeeded();

    await expect(cotizadorSection).toBeVisible();

    const summaryInst = page.locator('#summary-institucion');
    const summarySrv = page.locator('#summary-servicio');
    const summaryEq = page.locator('#summary-equipos');
    const submitWaBtn = page.locator('#cotizador-submit-wa');

    // Initial default summary values
    await expect(summaryInst).toContainText('Hospital / Sanatorio');
    await expect(summarySrv).toContainText('Mantenimiento Preventivo');
    await expect(summaryEq).toContainText('4 a 10 equipos');

    // Change institution to Clínica Privada
    const clinicaRadio = page.locator('input[name="institucion"][value="clinica"]');
    await clinicaRadio.click({ force: true });
    await expect(summaryInst).toContainText('Clínica Privada');

    // Change service to Mantenimiento Correctivo
    const correctivoRadio = page.locator('input[name="servicio"][value="correctivo"]');
    await correctivoRadio.click({ force: true });
    await expect(summarySrv).toContainText('Mantenimiento Correctivo');

    // Change equipment range to 1-3
    const eqRadio = page.locator('input[name="equipos"][value="1-3"]');
    await eqRadio.click({ force: true });
    await expect(summaryEq).toContainText('1 a 3 equipos');

    // Verify WhatsApp button href contains encoded parameters
    const href = await submitWaBtn.getAttribute('href');
    expect(href).toContain('wa.me');
    expect(href).toContain('Cl%C3%ADnica%20Privada');
  });

  test('Cobertura NOA section should allow tab switching and show province details', async ({ page }) => {
    const coberturaSection = page.locator('#cobertura');
    await coberturaSection.scrollIntoViewIfNeeded();

    await expect(coberturaSection).toBeVisible();

    // Check Tucumán tab is selected by default
    const tucumanTab = page.locator('#tab-tucuman');
    const saltaTab = page.locator('#tab-salta');
    const tucumanPanel = page.locator('#panel-tucuman');
    const saltaPanel = page.locator('#panel-salta');

    await expect(tucumanTab).toHaveAttribute('aria-selected', 'true');
    await expect(tucumanPanel).toBeVisible();
    await expect(saltaPanel).toBeHidden();

    // Switch to Salta tab
    await saltaTab.click();
    await expect(saltaTab).toHaveAttribute('aria-selected', 'true');
    await expect(saltaPanel).toBeVisible();
    await expect(tucumanPanel).toBeHidden();

    // Verify Salta panel content
    await expect(saltaPanel).toContainText('Servicio Técnico en Salta');
    await expect(saltaPanel).toContainText('Salta Capital');
  });
});
