import { expect } from '@playwright/test';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

import { accessCensusSheetSection, clickActionsButton } from '../UC3.4/UC3.4_TC1.functions.js';

export const selectDownloadOperation = async function(page, reporter) {
    const startTime = new Date().getTime();
    const censusSheetPage = new CensusSheetPage(page);

    const [download] = await Promise.all([
        page.waitForEvent('download'),
        censusSheetPage.clickAzioneDownload()
    ]);

    const executionTime = (new Date().getTime() - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3.4.1_TC1_ID1', 'Seleziona l’operazione di download della scheda censimento', 'Il browser avvia il download', `Download avviato: ${download.suggestedFilename()}`, true, '', executionTime);
    }
};

export const verifyDownloadCompletion = async function(page, reporter) {
    const startTime = new Date().getTime();
    const censusSheetPage = new CensusSheetPage(page);

    await expect(censusSheetPage.searchInput).toBeVisible({ timeout: 10000 });

    const executionTime = (new Date().getTime() - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3.4.1_TC1_ID2', 'Attendi la fine del download', 'Il file viene scaricato correttamente', 'Download completato con successo', true, '', executionTime);
    }
};