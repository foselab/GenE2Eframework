import { test, expect } from '@playwright/test';

// Definizione dei parametri
const baseURL = 'http://192.168.34.250/';
const loginURL = 'http://idp-test.bologna.enea.it/#/login/yT4hfSan8TI9yPHaYinwpklRjGutw6kF';
const homeURL = 'http://192.168.34.250/home';
const incorrectEmail = 'incorrect.supplier@pell.it';
const incorrectPassword = 'Incorrect01!';

test('test', async ({ page, browser }) => {

  // Step 1: Navigo al sito
  const startTimeStep1 = Date.now();
  const response1 = await page.goto(baseURL);
  const endTimeStep1 = Date.now();
  console.log(`Step 1 Execution Time: ${endTimeStep1 - startTimeStep1} ms`);
  expect(response1.status()).toBe(200); // HTTP 200 per caricamento corretto sito


  // Step 2: clicco su "Login"
  const startTimeStep2 = Date.now();
  await page.getByRole('link', { name: 'Login' }).click();
  await page.waitForURL(loginURL);
  const endTimeStep2 = Date.now();
  console.log(`Step 2 Execution Time: ${endTimeStep2 - startTimeStep2} ms`);
  await page.waitForSelector('input[name="email"]', { state: 'visible' });
  expect(await page.isVisible('input[name="email"]')).toBe(true); // Verifica che il campo email sia visibile


  // Step 3: Compilare la form di login con dati errati
  const startTimeStep3 = Date.now();
  await page.getByLabel('E-mail').click();
  await page.getByLabel('E-mail').fill(incorrectEmail);
  await page.locator('div').filter({ hasText: /^Password$/ }).click();
  await page.getByLabel('Password', { exact: true }).fill(incorrectPassword);
  const endTimeStep3 = Date.now();
  console.log(`Step 3 Execution Time: ${endTimeStep3 - startTimeStep3} ms`);
  const emailValue = await page.getByLabel('E-mail').inputValue();
  const passwordValue = await page.getByLabel('Password', { exact: true }).inputValue();
  expect(emailValue).toBe(incorrectEmail); // Verifica che il campo email sia compilato correttamente
  expect(passwordValue).toBe(incorrectPassword); // Verifica che il campo password sia compilato correttamente


  // Step 4: Cliccare sul pulsante "Login" e verificare che il login fallisca
  const startTimeStep4 = Date.now();
  await page.getByRole('button', { name: 'Login' }).click();
  // Aspetta un'eventuale messaggio di errore, o che l'URL non cambi
  await page.waitForTimeout(2000);
  const endTimeStep4 = Date.now();
  console.log(`Step 4 Execution Time: ${endTimeStep4 - startTimeStep4} ms`);

  // Verifica che l'URL non sia cambiato e che non sia homeURL
  const finalURL = page.url();
  expect(finalURL).not.toBe(homeURL); // Verifica che l'URL finale non sia la homepage, il che indica un fallimento del login
  console.log("Il test è fallito nello Step 3 come previsto.");
});
