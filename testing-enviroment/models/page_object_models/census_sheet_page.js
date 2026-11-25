import path from 'path';

export class CensusSheetPage {
  constructor(page) {
    this.page = page;
    this.path = path;
    
    // Locators
    this.searchInput = page.getByPlaceholder('Cerca');
    this.uploadButton = page.locator('#modal_upload_censustechsheet_btn');
    this.fileInput = page.locator('input[type="file"]');
    this.okButton = page.getByRole('button', { name: 'OK' });
    this.actionDropdown = page.locator('.text-start > .btn').first();
    this.downloadOption = page.locator('[data-kt-cts-table-filter="download_row"]').first();
    this.deleteOption = page.locator('[data-kt-cts-table-filter="delete_row"]').first();
    this.editOption = page.locator('[data-kt-cts-table-filter="edit_row"]').first();
    this.detailOption = page.locator('a[data-kt-cts-table-filter="detail_row"]').first();
    this.freezeOption = page.locator('a.menu-link:visible', { hasText: 'Modifica stato' }).first();
    this.confirmDeleteButton = page.locator('button.swal2-confirm.btn.fw-bold.btn-danger').first();
    this.cancelDeleteButton = page.locator('button.swal2-cancel.btn.fw-bold.btn-active-light-primary').first();
    this.confirmButton = page.locator('button.swal2-confirm.btn.fw-bold.btn-primary').first();
    
    // Column headers
    this.azioniColumn = page.getByLabel('Azioni');
    this.schedaColumn = page.getByLabel('Scheda: attiva per ordinare');
    this.proprietarioColumn = page.getByLabel('Proprietario: attiva per');
    this.comuneColumn = page.getByLabel('Comune: attiva per ordinare');
    this.statsColumn = page.getByLabel('Stats: attiva per ordinare la');
    this.statoColumn = page.getByLabel('Stato: attiva per ordinare la');
    this.infoColumn = page.getByLabel('Info: attiva per ordinare la');
    this.creazioneColumn = page.getByLabel('Creazione: attiva per');
    this.aggiornamentoColumn = page.getByLabel('Aggiornamento: attiva per');
    this.sottomissioneColumn = page.getByLabel('Sottomissione: attiva per');
  }

  async clickAzioniColumn() {
    await this.azioniColumn.click({timeout: 300000});
  }

  async clickSchedaColumn() {
    await this.schedaColumn.click({timeout: 300000});
  }

  async clickProprietarioColumn() {
    await this.proprietarioColumn.click({timeout: 300000});
  }

  async clickComuneColumn() {
    await this.comuneColumn.click({timeout: 300000});
  }

  async clickStatsColumn() {
    await this.statsColumn.click({timeout: 300000});
  }

  async clickStatoColumn() {
    await this.statoColumn.click({timeout: 300000});
  }

  async clickInfoColumn() {
    await this.infoColumn.click({timeout: 300000});
  }

  async clickCreazioneColumn() {
    await this.creazioneColumn.click({timeout: 300000});
  }

  async clickAggiornamentoColumn() {
    await this.aggiornamentoColumn.click({timeout: 300000});
  }

  async clickSottomissioneColumn() {
    await this.sottomissioneColumn.click({timeout: 300000});
  }

  async open() {
    await this.page.goto(process.env.E2E_CTS_URL, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await this.searchInput.waitFor({ state: 'visible', timeout: 20000 });
  }

  async searchByName(name = 'Abriola') {
    await this.page.getByPlaceholder('Cerca').click();
    await this.page.getByPlaceholder('Cerca').fill(name);
    await this.page.getByPlaceholder('Cerca').press('Enter');
    await this.page.waitForLoadState('networkidle').catch(() => {});
  }

  async getRowsCount() {
    return await this.page.locator('table tbody tr').count();
  }

  async getRowText(index = 0) {
    const txt = await this.page.locator('table tbody tr').nth(index).innerText();
    return txt.replace(/\s+/g, ' ').trim();
  }

  async hasResults() {
    await this.page.locator('table tbody tr').first().waitFor({ state: 'visible', timeout: 10000 }).catch(() => {});
    return await this.getRowsCount() > 0;
  }

  async clickAzioniButton() {
    await this.actionDropdown.waitFor({ state: 'visible' });
    await this.actionDropdown.click();
  }

  async clickAzioneDownload() {
    await this.page.locator('[data-kt-cts-table-filter="download_row"]').first().click();
  }

  async clickAzioneDelete() {
    await this.page.locator('[data-kt-cts-table-filter="delete_row"]').first().click();
  }

  async clickConfirmAzioneDelete() {
    await this.page.locator('button.swal2-confirm.btn.fw-bold.btn-danger').first().click();
    await this.page.locator('button.swal2-confirm.btn.fw-bold.btn-primary').first().click();
  }

  async clickCancelAzioneDelete() {
    await this.page.locator('button.swal2-cancel.btn.fw-bold.btn-active-light-primary').first().click();
    await this.page.locator('button.swal2-confirm.btn.fw-bold.btn-primary').first().click();
  }

  async clickAzioneEdit() {
    await this.page.locator('[data-kt-cts-table-filter="edit_row"]').first().click();
  }

  async clickAzioneCongela() {
    if (!(await this.freezeOption.isVisible())) {
      await this.clickAzioniButton();
    }
    await this.freezeOption.click();
  }

  async clickAzioneDettaglio() {
    await this.page.locator('a[data-kt-cts-table-filter="detail_row"]').first().click();
  }
}