import { expect } from '@playwright/test';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

import { accessSearchSection } from '../UC3.2/UC3.2_TC1.functions.js';

export const insertValidName = async function(page, reporter) {
    const startTime = new Date().getTime();
    const censusSheetPage = new CensusSheetPage(page);

    await censusSheetPage.searchByName('Abriola');
    await expect(censusSheetPage.searchInput).toHaveValue('Abriola', { timeout: 10000 });

    const executionTime = (new Date().getTime() - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3.2.1_TC1_ID1', 'Inserisci un nome valido nella barra di ricerca', 'La pagina di risultati si carica correttamente', 'Nome "Abriola" inserito nella barra di ricerca', true, '', executionTime);
    }
};

export const confirmSearch = async function(page, reporter) {
    const startTime = new Date().getTime();
    const censusSheetPage = new CensusSheetPage(page);

    await censusSheetPage.page.waitForLoadState('networkidle').catch(() => {});
    await expect(censusSheetPage.page.locator('table tbody tr').first()).toBeVisible({ timeout: 10000 });
    const rowCount = await censusSheetPage.getRowsCount();

    const executionTime = (new Date().getTime() - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3.2.1_TC1_ID2', 'Conferma la ricerca', 'I risultati della ricerca vengono visualizzati', `Visualizzate ${rowCount} righe di risultati`, true, '', executionTime);
    }
};

export const viewSheetDetails = async function(page, reporter) {
    const startTime = new Date().getTime();
    const censusSheetPage = new CensusSheetPage(page);

    await censusSheetPage.clickAzioniButton();
    await censusSheetPage.clickAzioneDettaglio();
    
    await censusSheetPage.page.waitForLoadState('networkidle').catch(() => {});
    await expect(censusSheetPage.page.locator('body')).toContainText('Abriola', { timeout: 10000 });

    const executionTime = (new Date().getTime() - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3.2.1_TC1_ID3', 'Visualizza i dettagli delle schede censimento trovate', 'Le informazioni sono complete e corrette', 'Dettagli della scheda visualizzati con successo', true, '', executionTime);
    }
};