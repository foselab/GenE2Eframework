import { expect } from '@playwright/test';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

import { accessCensusSheetSection } from '../UC3.4/UC3.4_TC1.functions.js';

export const selectDeleteOperation = async function(page, reporter) {
    const startTime = new Date().getTime();
    const censusSheetPage = new CensusSheetPage(page);

    await censusSheetPage.clickAzioniButton();
    await censusSheetPage.clickAzioneDelete();
    
    await expect(censusSheetPage.confirmDeleteButton).toBeVisible({ timeout: 10000 });

    const executionTime = (new Date().getTime() - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3.4.2_TC2_ID1', 'Seleziona l’operazione di cancellazione di una scheda censimento esistente', 'Viene richiesta la conferma dell’eliminazione', 'Conferma eliminazione visibile', true, '', executionTime);
    }
};

export const cancelDeleteOperation = async function(page, reporter) {
    const startTime = new Date().getTime();
    const censusSheetPage = new CensusSheetPage(page);

    await censusSheetPage.clickCancelAzioneDelete();
    
    await expect(censusSheetPage.confirmDeleteButton).not.toBeVisible({ timeout: 10000 });
    await expect(censusSheetPage.searchInput).toBeVisible({ timeout: 10000 });

    const executionTime = (new Date().getTime() - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3.4.2_TC2_ID2', 'Annulla l’eliminazione della scheda indicata', 'L’operazione di eliminazione viene interrotta e la scheda rimane integra', 'Eliminazione annullata, scheda integra', true, '', executionTime);
    }
};