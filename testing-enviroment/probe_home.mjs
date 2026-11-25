import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const env = {};
for (const line of fs.readFileSync(path.resolve('.env'), 'utf8').split(/\r?\n/)) {
  const m = line.match(/^([A-Z_]+)=(.*)$/);
  if (m) env[m[1]] = m[2].trim();
}

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1400, height: 900 } });
const page = await ctx.newPage();
const t0 = Date.now();
await page.goto('http://pell-portal.bologna.enea.it/pell-ip', { waitUntil: 'domcontentloaded' });
console.log('start url', page.url());
if (page.url().includes('idp.smartcityplatform')) {
  await page.fill('input[name="email"]', env.EMAIL);
  await page.fill('input[name="password"]', env.PASSWORD);
  await page.getByRole('button', { name: /login/i }).click();
}
try {
  await page.waitForURL(u => !String(u).includes('idp.smartcityplatform'), { timeout: 60000 });
  console.log('after login', page.url(), ((Date.now() - t0) / 1000).toFixed(1) + 's');
} catch (e) {
  console.log('login timeout', page.url(), String(e).split('\n')[0]);
}
for (const u of ['/pell-ip/home', '/pell-ip/dashboard', '/pell-ip/censustechsheets']) {
  const r = await page.goto('http://pell-portal.bologna.enea.it' + u, { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(e => ({ status: () => 'ERR ' + String(e).split('\n')[0] }));
  console.log(u, typeof r.status === 'function' ? r.status() : r, '| final', page.url(), '| title', (await page.title()).slice(0, 60));
}
await browser.close();
