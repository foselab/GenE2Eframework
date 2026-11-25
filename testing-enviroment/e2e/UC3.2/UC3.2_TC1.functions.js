import { expect } from '@playwright/test';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

import { loginAndAccessDashboard, openCensusSheetSection } from '../UC3/UC3_TC1.functions.js';

export const accessSearchSection = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    await loginAndAccessDashboard(page, null);
    await openCensusSheetSection(page, null);
    
    const censusSheetPage = new CensusSheetPage(page);
    await expect(censusSheetPage.searchInput).toBeVisible({ timeout: 10000 });

    const executionTime = (new Date().getTime() - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3.2_TC1_ID1', 'Accedi alla sezione di ricerca schede censimento', 'La barra di ricerca è visibile', 'Barra di ricerca visibile', true, '', executionTime);
    }
};

export const insertValidParameters = async function(page, reporter) {
    const startTime = new Date().getTime();
    const censusSheetPage = new CensusSheetPage(page);
    
    await censusSheetPage.searchByName('Abriola');
    await expect(censusSheetPage.searchInput).toHaveValue('Abriola', { timeout: 10000 });

    const executionTime = (new Date().getTime() - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3.2_TC1_ID2', 'Inserisci parametri di ricerca validi', 'I parametri vengono accettati', 'Parametro "Abriola" inserito', true, '', executionTime);
    }
};

export const executeSearch = async function(page, reporter) {
    const startTime = new Date().getTime();
    const censusSheetPage = new CensusSheetPage(page);
    
    await censusSheetPage.searchByName('Abriola');
    await expect(censusSheetPage.page.locator('table tbody tr').first()).toBeVisible({ timeout: 10000 });
    
    const rowCount = await censusSheetPage.getRowsCount();

    const executionTime = (new Date().getTime() - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3.2_TC1_ID3', 'Esegui la ricerca', 'Vengono visualizzate le informazioni relative ai parametri inseriti', `Visualizzate ${rowCount} righe`, true, '', executionTime);
    }
};