export class DashboardPageGeneralDataTable {
  constructor(page) {
    this.page = page;
    
    // Table navigation selectors
    this.generalDataTable = this.page.getByText('Tabella Dati generali');
    this.dataTable = this.page.locator('#table_table_general_data');
    this.nextButton = this.page.locator('#table_table_general_data_next a');
    this.pageOneLink = this.page.locator('#table_table_general_data_paginate a').filter({ hasText: /^1$/ }).first();
    this.elementsDropdown = this.page.locator('select[name="table_table_general_data_length"]');
    this.regionSortButton = page.locator('th').filter({ hasText: 'Regione' });
    this.pointsLightSortButton = page.locator('th').filter({ hasText: 'N° di Punti Luce' });
  }

  async open() {
    await this.page.goto(process.env.E2E_DASHBOARD_URL, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await this.dataTable.waitFor({ state: 'visible', timeout: 20000 });
  }

  async getTableContent() {
    return await this.dataTable.innerText();
  }

  async navigateToNextPage() {
    await this.nextButton.click();
  }

  async navigateToPageOne() {
    await this.pageOneLink.click();
  }

  async changeElementsPerPage(value = '25') {
    await this.elementsDropdown.selectOption(value);
  }

  async sortByRegion() {
    await this.regionSortButton.click();
  }

  async sortByPointsOfLight() {
    await this.pointsLightSortButton.click();
  }

  async isTableVisible() {
    return await this.dataTable.isVisible();
  }

  async isNextButtonVisible() {
    return await this.nextButton.isVisible();
  }

  async isElementsDropdownVisible() {
    return await this.elementsDropdown.isVisible();
  }

  async isSortButtonsVisible() {
    const regionVisible = await this.regionSortButton.isVisible();
    const pointsVisible = await this.pointsLightSortButton.isVisible();
    return regionVisible && pointsVisible;
  }
}
