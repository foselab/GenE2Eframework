import { expect } from '@playwright/test';

import { DashboardPageGeneralDataTable } from '../../models/page_object_models/dashboard_page_general_data_table.js';

import { loginToPlatform, openDashboard } from '../UC2/UC2_TC1.functions.js';

export const accessDashboard = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    await loginToPlatform(page, null);
    await openDashboard(page, null);

    const executionTime = (new Date().getTime() - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC2.3_TC1_ID1', 'Accedi alla sezione dashboard tramite il menù apposito', 'La sezione dashboard viene visualizzata correttamente', 'Dashboard aperta', true, '', executionTime);
    }
};

export const viewGeneralDataTable = async function(page, reporter) {
    const startTime = new Date().getTime();
    const dashboardPage = new DashboardPageGeneralDataTable(page);

    await dashboardPage.open();
    await expect(dashboardPage.dataTable).toBeVisible({ timeout: 10000 });
    const content = await dashboardPage.getTableContent();

    const executionTime = (new Date().getTime() - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC2.3_TC1_ID2', 'Scorri nella pagina fino a visualizzare la sezione tabellare dedicata ai dati generali', 'La tabella dei dati generali è visibile e contiene le informazioni attese', `Contenuto tabella: ${content.substring(0, 50)}...`, true, '', executionTime);
    }
};

export const verifyTableFunctionality = async function(page, reporter) {
    const startTime = new Date().getTime();
    const dashboardPage = new DashboardPageGeneralDataTable(page);

    await dashboardPage.changeElementsPerPage('10');
    await expect(dashboardPage.dataTable).toBeVisible({ timeout: 10000 });
    
    const nextVisible = await dashboardPage.isNextButtonVisible();
    if (nextVisible) {
        await dashboardPage.navigateToNextPage();
        await expect(dashboardPage.dataTable).toBeVisible({ timeout: 10000 });
        await dashboardPage.navigateToPageOne();
    }

    const executionTime = (new Date().getTime() - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC2.3_TC1_ID3', 'Verifica che sia possibile scorrere tra i comuni disponibili e modificare gli elementi visualizzati per pagina', 'Le funzionalità di scrolling e selezione del numero di elementi per pagina funzionano correttamente', 'Funzionalità tabella verificate', true, '', executionTime);
    }
};