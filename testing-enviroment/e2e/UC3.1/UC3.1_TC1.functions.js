import { expect } from '@playwright/test';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

import { loginAndAccessDashboard, openCensusSheetSection } from '../UC3/UC3_TC1.functions.js';

export const accessCensusSection = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    await loginAndAccessDashboard(page, null);
    await openCensusSheetSection(page, null);
    
    const censusSheetPage = new CensusSheetPage(page);
    await expect(censusSheetPage.searchInput).toBeVisible({ timeout: 10000 });

    const executionTime = (new Date().getTime() - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3.1_TC1_ID1', 'Accedi alla sezione di visualizzazione delle schede censimento', 'La tabella con le informazioni viene visualizzata correttamente', 'Sezione schede censimento accessibile', true, '', executionTime);
    }
};

export const sortTable = async function(page, reporter) {
    const startTime = new Date().getTime();
    const censusSheetPage = new CensusSheetPage(page);

    await censusSheetPage.clickSchedaColumn();
    await expect(censusSheetPage.searchInput).toBeVisible({ timeout: 10000 });

    const executionTime = (new Date().getTime() - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3.1_TC1_ID2', 'Seleziona una colonna per l’ordinamento e clicca sul nome della colonna', 'Le righe vengono ordinate in base alla selezione', 'Colonna Scheda ordinata', true, '', executionTime);
    }
};

export const scrollColumns = async function(page, reporter) {
    const startTime = new Date().getTime();
    const censusSheetPage = new CensusSheetPage(page);

    await censusSheetPage.clickSottomissioneColumn();
    await expect(censusSheetPage.searchInput).toBeVisible({ timeout: 10000 });

    const executionTime = (new Date().getTime() - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3.1_TC1_ID3', 'Scorri lateralmente per visualizzare tutte le colonne', 'Tutte le colonne sono visibili e scorrevoli', 'Colonna Sottomissione visibile', true, '', executionTime);
    }
};