import { expect } from '@playwright/test';

import { SidebarPage } from '../../models/page_object_models/sidebar_page.js';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

import { enterCredentials, clickLoginButton, verifyAuthentication } from '../UC1/UC1_TC1.functions.js';

export const loginAndAccessDashboard = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    await enterCredentials(page, null);
    await clickLoginButton(page, null);
    await verifyAuthentication(page, null);

    const executionTime = (new Date().getTime() - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3_TC1_ID1', 'Accedi alla piattaforma e autenticati correttamente', 'La dashboard principale viene visualizzata', 'Autenticazione completata e dashboard visibile', true, '', executionTime);
    }
};

export const openCensusSheetSection = async function(page, reporter) {
    const startTime = new Date().getTime();
    const sidebarPage = new SidebarPage(page);
    const censusSheetPage = new CensusSheetPage(page);

    await sidebarPage.clickCensusSheetLink();
    await censusSheetPage.searchInput.waitFor({ state: 'visible', timeout: 20000 });

    const executionTime = (new Date().getTime() - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3_TC1_ID2', 'Seleziona la voce del menù laterale relativa alle schede censimento', 'La sezione delle schede censimento si apre correttamente', 'Sezione schede censimento visibile', true, '', executionTime);
    }
};