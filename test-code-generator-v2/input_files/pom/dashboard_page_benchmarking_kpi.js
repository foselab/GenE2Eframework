export class DashboardPageBenchmarkingKpi {
  constructor(page) {
    this.page = page;
    
    // City selection selectors
    this.citySelector = this.page.locator('#form_chart_municipality_benchmark_general_data_static tags.tagify');
    this.cityItems = this.page.locator('.tagify__dropdown__item');
    
    // KPI selection selectors
    this.kpiSelector = this.page.locator('#compute_apply_chart_municipality_benchmark_general_data_static');
    
    // Results verification selectors
    this.chartContainer = this.page.locator('#inner_area_chart_municipality_benchmark_general_data_static');
    this.chartPoint = this.page.locator('path.highcharts-point').first();
  }

  async open() {
    await this.page.goto(process.env.E2E_DASHBOARD_URL, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await this.citySelector.waitFor({ state: 'visible', timeout: 20000 });
  }

  async openCitySelector() {
    await this.citySelector.click();
  }

  async selectCityByIndex(cityIndex = 0) {
    await this.cityItems.nth(cityIndex).click();
    await this.page.keyboard.press('Escape');
  }

  async selectCity(cityIndex = 0) {
    await this.openCitySelector();
    await this.selectCityByIndex(cityIndex);
  }

  async waitForKPISelectorVisible() {
    await this.page.waitForSelector('#compute_apply_chart_municipality_benchmark_general_data_static', { state: 'visible' });
  }

  async selectKPI() {
    await this.waitForKPISelectorVisible();
    await this.kpiSelector.click();
  }

  async waitForResults(timeout = 5000) {
    await this.page.waitForTimeout(timeout);
  }

  async isChartContainerVisible() {
    return await this.chartContainer.isVisible();
  }

  async isChartPointVisible() {
    return await this.chartPoint.isVisible();
  }

  async verifyKPIResults() {
    const isChartContainerVisible = await this.isChartContainerVisible();
    const isPointVisible = await this.isChartPointVisible();
    
    return isChartContainerVisible || isPointVisible;
  }

  async applyKPIAndVerify(timeout = 5000) {
    await this.waitForResults(timeout);
    return await this.verifyKPIResults();
  }

  async isCitySelectorVisible() {
    return await this.citySelector.isVisible();
  }

  async isKPISelectorVisible() {
    return await this.kpiSelector.isVisible();
  }
}