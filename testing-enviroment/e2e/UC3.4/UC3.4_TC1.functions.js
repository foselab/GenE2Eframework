import { expect } from '@playwright/test';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

import { loginAndAccessDashboard, openCensusSheetSection } from '../UC3/UC3_TC1.functions.js';

export const accessCensusSheetSection = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    await loginAndAccessDashboard(page, null);
    await openCensusSheetSection(page, null);
    
    const censusSheetPage = new CensusSheetPage(page);
    await expect(censusSheetPage.searchInput).toBeVisible({ timeout: 10000 });

    const executionTime = (new Date().getTime() - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3.4_TC1_ID1', 'Accedi alla sezione delle schede censimento', 'La lista delle schede censimento è visibile', 'Sezione schede censimento visibile', true, '', executionTime);
    }
};

export const clickActionsButton = async function(page, reporter) {
    const startTime = new Date().getTime();
    const censusSheetPage = new CensusSheetPage(page);

    await censusSheetPage.clickAzioniButton();
    await expect(censusSheetPage.downloadOption).toBeVisible({ timeout: 10000 });

    const executionTime = (new Date().getTime() - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3.4_TC1_ID2', 'Clicca sul tasto azioni di una scheda censimento', 'Viene visualizzata la palette di operazioni disponibili', 'Palette di operazioni visibile', true, '', executionTime);
    }
};