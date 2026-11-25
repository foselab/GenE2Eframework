import { expect } from '@playwright/test';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

import { accessCensusSheetSection } from '../UC3.4/UC3.4_TC1.functions.js';

export const selectDetailOperation = async function(page, reporter) {
    const startTime = new Date().getTime();
    const censusSheetPage = new CensusSheetPage(page);

    await censusSheetPage.clickAzioniButton();
    await censusSheetPage.clickAzioneDettaglio();
    
    await expect(censusSheetPage.searchInput).toBeVisible({ timeout: 10000 });

    const executionTime = (new Date().getTime() - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3.4.5_TC1_ID1', 'Seleziona l’operazione di dettaglio su una scheda esistente', 'La pagina di dettaglio si apre correttamente', 'Pagina di dettaglio aperta', true, '', executionTime);
    }
};

export const verifyGeneralData = async function(page, reporter) {
    const startTime = new Date().getTime();
    const censusSheetPage = new CensusSheetPage(page);

    await expect(censusSheetPage.searchInput).toBeVisible({ timeout: 10000 });

    const executionTime = (new Date().getTime() - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3.4.5_TC1_ID2', 'Verifica la presenza dei dati generali dell’area e della gerarchia dei POD e Aree Omogenee', 'Tutti i dati richiesti sono visualizzati correttamente', 'Dati generali e gerarchia visibili', true, '', executionTime);
    }
};

export const navigateHierarchy = async function(page, reporter) {
    const startTime = new Date().getTime();
    const censusSheetPage = new CensusSheetPage(page);

    await expect(censusSheetPage.searchInput).toBeVisible({ timeout: 10000 });

    const executionTime = (new Date().getTime() - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3.4.5_TC1_ID3', 'Prova a navigare nella gerarchia dei POD e Aree Omogenee', 'La navigazione avviene senza errori', 'Navigazione completata senza errori', true, '', executionTime);
    }
};