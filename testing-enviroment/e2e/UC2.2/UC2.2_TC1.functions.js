import { expect } from '@playwright/test';

import { DashboardPageIlluminationSearch } from '../../models/page_object_models/dashboard_page_illumination_search.js';

import { loginToPlatform, openDashboard } from '../UC2/UC2_TC1.functions.js';

export const selectSearchParameters = async function(page, reporter) {
    const startTime = new Date().getTime();
    const dashboardPage = new DashboardPageIlluminationSearch(page);

    await dashboardPage.selectComune(0);
    await dashboardPage.selectPod('SI');
    await dashboardPage.selectPanels('SI');
    await dashboardPage.selectLights('SI');

    const executionTime = (new Date().getTime() - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC2.2_TC1_ID1', 'Seleziona un comune e dei parametri di ricerca validi', 'I parametri vengono accettati', 'Parametri selezionati: Comune, POD, Pannelli, Punti Luce', true, '', executionTime);
    }
};

export const confirmSearch = async function(page, reporter) {
    const startTime = new Date().getTime();
    const dashboardPage = new DashboardPageIlluminationSearch(page);

    await dashboardPage.applySearch();
    await page.waitForLoadState('networkidle', { timeout: 20000 });
    
    const hasResults = await dashboardPage.hasResults();
    await expect(hasResults).toBe(true, { timeout: 10000 });

    const executionTime = (new Date().getTime() - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC2.2_TC1_ID2', 'Conferma la ricerca', 'La mappa si aggiorna con gli impianti di illuminazione trovati', 'Risultati presenti sulla mappa', true, '', executionTime);
    }
};

export const viewPlantDetails = async function(page, reporter) {
    const startTime = new Date().getTime();
    const dashboardPage = new DashboardPageIlluminationSearch(page);

    const firstResult = dashboardPage.resultsCluster.first();
    await firstResult.click();
    
    await expect(dashboardPage.mapText).toBeVisible({ timeout: 10000 });

    const executionTime = (new Date().getTime() - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC2.2_TC1_ID3', 'Visualizza i dettagli degli impianti di illuminazione', 'Le informazioni vengono visualizzate correttamente', 'Dettagli impianto visualizzati', true, '', executionTime);
    }
};