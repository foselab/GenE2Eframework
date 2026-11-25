import { NavbarPage } from './navbar_page.js';

export class LoginPage {
  constructor(page) {
    this.page = page;
    
    // Locators
    this.loginLink = page.getByRole('link', { name: 'Login' });
    this.emailInput = page.getByLabel('E-mail');
    this.passwordInput = page.getByLabel('Password', { exact: true });
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.errorNotification = page.locator('.simple-notification .sn-content, .simple-notification, .alert, .invalid-feedback').first();
    
    // Selectors
    this.emailFieldSelector = 'input[name="email"]';
  }

  // Login flow methods
  async open() {
    await this.page.goto(process.env.E2E_BASE_URL, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await this.loginLink.waitFor({ state: 'visible', timeout: 15000 });
  }

  async login(email, password) {
    await this.open();
    await this.clickLoginLink();
    await this.emailInput.waitFor({ state: 'visible', timeout: 15000 });
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.clickLoginButton();
  }

  async waitForAuthentication() {
    await this.page.waitForURL(url => !String(url).includes('idp.smartcityplatform'), { timeout: 60000 });
    await new NavbarPage(this.page).waitForUserMenu();
  }

  async clickLoginLink() {
    if (!(await this.loginLink.isVisible())) {
      await this.page.goto(process.env.E2E_BASE_URL, { waitUntil: 'domcontentloaded' });
    }
    await this.loginLink.click();
  }

  async isEmailFieldVisible() {
    return await this.page.isVisible(this.emailFieldSelector);
  }

  async fillEmail(email) {
    if (!(await this.emailInput.isVisible().catch(() => false))) {
      await this.page.goto(process.env.E2E_LOGIN_URL, { waitUntil: 'domcontentloaded', timeout: 30000 });
    }
    await this.emailInput.fill(email);
  }

  async fillPassword(password) {
    if (!(await this.passwordInput.isVisible().catch(() => false))) {
      await this.page.goto(process.env.E2E_LOGIN_URL, { waitUntil: 'domcontentloaded', timeout: 30000 });
    }
    await this.passwordInput.fill(password);
  }

  async clickLoginButton() {
    await this.loginButton.click();
  }

  async waitForErrorMessage() {
    await this.errorNotification.waitFor({ state: 'visible', timeout: 10000 });
  }

  async getErrorMessage() {
    if (!(await this.errorNotification.count())) {
      return '';
    }
    try {
      await this.errorNotification.waitFor({ state: 'visible', timeout: 3000 });
    } catch (error) {
      return '';
    }
    return (await this.errorNotification.innerText()).trim();
  }
}
