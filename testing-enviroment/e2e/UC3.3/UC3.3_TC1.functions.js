import { expect } from '@playwright/test';

import { CensusSheetPageUpload } from '../../models/page_object_models/census_sheet_page_upload.js';

import { loginAndAccessDashboard, openCensusSheetSection } from '../UC3/UC3_TC1.functions.js';

export const openUploadModal = async function(page, reporter) {
    const startTime = new Date().getTime();
    const uploadPage = new CensusSheetPageUpload(page);

    await uploadPage.waitForUploadSchedaModalButton();
    await uploadPage.clickUploadSchedaModalButton();
    await uploadPage.waitForUploadModal();

    const executionTime = (new Date().getTime() - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3.3_TC1_ID1', 'Clicca sul tasto di caricamento delle schede censimento', 'La finestra di caricamento si apre correttamente', 'Modale di caricamento visibile', true, '', executionTime);
    }
};

export const uploadValidFile = async function(page, reporter) {
    const startTime = new Date().getTime();
    const uploadPage = new CensusSheetPageUpload(page);

    await uploadPage.uploadValidSheet();
    await uploadPage.waitForUploadApplyButton();

    const executionTime = (new Date().getTime() - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3.3_TC1_ID2', 'Seleziona il file XML valido', 'Il sistema accetta il file e i parametri', 'File caricato e pulsante Applica visibile', true, '', executionTime);
    }
};

export const confirmUpload = async function(page, reporter) {
    const startTime = new Date().getTime();
    const uploadPage = new CensusSheetPageUpload(page);

    await uploadPage.clickUploadApplyButton();
    await page.waitForLoadState('networkidle').catch(() => {});
    
    // Assert that the modal is closed or the page state has changed to indicate success
    // Since the model doesn't expose a specific success message locator, we assert the modal is no longer visible
    await expect(page.locator('#upload_sheet_file')).not.toBeVisible({ timeout: 10000 });

    const executionTime = (new Date().getTime() - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3.3_TC1_ID3', 'Procedi all’upload del file', 'La barra di caricamento appare e il file viene caricato con successo', 'Upload completato e modale chiusa', true, '', executionTime);
    }
};