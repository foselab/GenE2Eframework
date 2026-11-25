import path from 'path';

// il runner parte dalla radice del progetto: niente import.meta, che il loader di Playwright non digerisce
const validSheetPath = path.resolve('test-data', 'SchedaCensimentoV2_Esempio1.xml');

export class CensusSheetPageUpload {
  constructor(page) {
    this.page = page;

    // Locators
    this.uploadButton = page.locator('#modal_upload_censustechsheet_btn');
    this.fileInput = page.locator('input[type="file"][accept*=".xml"]').first();
  }

  async waitForUploadSchedaModalButton() {
    await this.page.waitForSelector('#modal_upload_censustechsheet_btn', { state: 'visible' });
  }

  async clickUploadSchedaModalButton() {
    await this.uploadButton.click();
  }

  async waitForUploadModal() {
    await this.page.waitForSelector('#upload_sheet_file', { state: 'visible' });
  }

  // Carica il file XML valido del progetto. Il percorso è risolto qui dentro,
  // così il test non deve indovinarlo.
  async uploadValidSheet() {
    await this.fileInput.setInputFiles(validSheetPath);
  }

  async setInputFiles(filePath) {
    await this.fileInput.setInputFiles(filePath);
  }

  async waitForUploadApplyButton() {
    await this.page.locator('.modal.show').getByRole('button', { name: 'Applica' }).waitFor({ state: 'visible' });
  }

  async clickUploadApplyButton() {
    await this.page.locator('.modal.show').getByRole('button', { name: 'Applica' }).click();
  }
}
