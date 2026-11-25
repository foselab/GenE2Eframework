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
        reporter.addStep('UC3.4.2_TC1_ID1', 'Seleziona l’operazione di cancellazione di una scheda censimento esistente', 'Viene richiesta la conferma dell’eliminazione', 'Modalità di conferma eliminazione visibile', true, '', executionTime);
    }
};

export const confirmDeletion = async function(page, reporter) {
    const startTime = new Date().getTime();
    const censusSheetPage = new CensusSheetPage(page);

    await censusSheetPage.clickConfirmAzioneDelete();
    
    await expect(censusSheetPage.searchInput).toBeVisible({ timeout: 10000 });

    const executionTime = (new Date().getTime() - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3.4.2_TC1_ID2', 'Conferma l’eliminazione della scheda indicata', 'Il sistema elimina la scheda e visualizza un messaggio di conferma', 'Eliminazione confermata e pagina stabile', true, '', executionTime);
    }
};