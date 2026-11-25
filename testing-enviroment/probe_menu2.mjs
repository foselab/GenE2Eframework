import { chromium } from 'playwright';
import dotenv from 'dotenv';
import fs from 'fs';
dotenv.config({ path: '.env' });
const out = {};
const browser = await chromium.launch({ headless: true, executablePath: 'C:/Users/user/AppData/Local/ms-playwright/chromium-1161/chrome-win/chrome.exe' });
const page = await browser.newPage({ viewport: { width: 1600, height: 1000 } });
await page.goto(process.env.E2E_LOGIN_URL, { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(4000);
await page.locator('input[name="email"]').fill(process.env.EMAIL);
await page.locator('input[name="password"]').fill(process.env.PASSWORD);
await page.getByRole('button', { name: /login/i }).click();
await page.waitForURL(u => !String(u).includes('idp.smartcityplatform'), { timeout: 90000 });
await page.goto(process.env.E2E_CTS_URL, { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(8000);

const btn = page.locator('.text-start > .btn').first();
await btn.click();
await page.waitForTimeout(1500);
// il contenitore del menu è il parent del bottone
out.voci_visibili = await btn.evaluate(el => {
  let box = el.closest('.dropdown, .menu, .btn-group') || el.parentElement;
  const els = box.querySelectorAll('a, button');
  return Array.from(els).filter(e => e.offsetWidth || e.offsetHeight)
    .map(e => (e.innerText || '').trim().replace(/\s+/g, ' ')).filter(Boolean);
});
out.modifica_stato_visibile = await page.getByText('Modifica stato', { exact: true }).first().isVisible().catch(() => null);
out.notarizza_visibile = await page.getByText('Notarizza', { exact: true }).first().isVisible().catch(() => null);
out.modifica_visibile = await page.getByText('Modifica', { exact: true }).first().isVisible().catch(() => null);
await page.screenshot({ path: 'menu_aperto.png' });
fs.writeFileSync('menu_aperto.json', JSON.stringify(out, null, 1));
console.log(JSON.stringify(out, null, 1));
await browser.close();
