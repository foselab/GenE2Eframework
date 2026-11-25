export class DashboardPageIlluminationSearch {
    constructor(page) {
        this.page = page;
        
        // Selectors
        this.comuniDropdown = this.page.getByLabel('Comuni', { exact: true });
        this.podSelector = this.page.getByLabel('POD', { exact: true });
        this.panelsSelector = this.page.getByLabel('Pannelli Elettrici', { exact: true });
        this.lightsSelector = this.page.getByLabel('Punti Luce', { exact: true });
        this.applyGeomapButton = this.page.locator('#compute_apply_geomap_1');
        this.mapText = this.page.locator('#inner_area_geomap_1');
        this.resultsCluster = this.page.locator('#inner_area_geomap_1 .leaflet-marker-icon');
    }

    async open() {
        await this.page.goto(process.env.E2E_DASHBOARD_URL, { waitUntil: 'domcontentloaded', timeout: 30000 });
        await this.comuniDropdown.waitFor({ state: 'visible', timeout: 20000 });
    }

    async selectComune(optionIndex = 0) {
        await this.comuniDropdown.selectOption({ index: optionIndex });
    }

    async selectPod(value = 'SI') {
        await this.podSelector.selectOption({ label: value });
    }

    async selectPanels(value = 'SI') {
        await this.panelsSelector.selectOption({ label: value });
    }

    async selectLights(value = 'SI') {
        await this.lightsSelector.selectOption({ label: value });
    }

    async getResultsCount() {
        const text = (await this.resultsCluster.first().innerText().catch(() => '')).trim();
        return parseInt(text, 10) || 0;
    }

    async hasResults() {
        return await this.resultsCluster.count() > 0;
    }

    async applySearch() {
        await this.applyGeomapButton.click();
    }

    async isMapVisible() {
        return await this.mapText.isVisible();
    }

    async isComuniDropdownVisible() {
        return await this.comuniDropdown.isVisible();
    }

    async isApplyButtonVisible() {
        return await this.applyGeomapButton.isVisible();
    }
}