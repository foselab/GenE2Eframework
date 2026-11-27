export class SaveToolPage {
  constructor(page) {
    this.page = page;

    // Locators
    this.step2Tab = page.getByText('Step 2 - Investimenti', { exact: false }).first();
    this.addInvestmentButton = page.getByRole('button', { name: 'Aggiungi Investimento' });
    this.investmentNameInput = page.locator('input[name="label_investment"]');
    this.applyButton = page.getByRole('button', { name: 'Applica' });
    this.backButton = page.getByRole('button', { name: 'Torna' });
  }

  async open() {
    await this.gotoPage();
    await this.step2Tab.waitFor({ state: 'visible', timeout: 20000 });
  }

  async gotoPage() {
    await this.page.goto(process.env.E2E_SAVE_URL);
  }

  async clickStep2Investments() {
    await this.step2Tab.click();
  }

  async clickAddInvestment() {
    await this.addInvestmentButton.click();
  }

  async waitForInvestmentForm() {
    await this.investmentNameInput.waitFor({ state: 'visible' });
  }

  async fillInvestmentName(name) {
    await this.investmentNameInput.fill(name);
  }

  // Il form apre con valori validi per tutti i campi numerici, serve solo il nome.
  async fillValidInvestment(name) {
    await this.waitForInvestmentForm();
    await this.fillInvestmentName(name);
  }

  async clickApply() {
    await this.applyButton.click();
  }

  async clickBack() {
    await this.backButton.click();
  }

  async isInvestmentVisible(name) {
    return await this.page.getByText(name, { exact: false }).first().isVisible();
  }
}
