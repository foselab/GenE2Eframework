import { expect } from '@playwright/test';

import { DashboardPageBenchmarkingKpi } from '../../models/page_object_models/dashboard_page_benchmarking_kpi.js';

import { loginToPlatform, openDashboard } from '../UC2/UC2_TC1.functions.js';

export const selectCities = async function(page, reporter) {
    const startTime = new Date().getTime();
    const dashboardPage = new DashboardPageBenchmarkingKpi(page);

    await dashboardPage.selectCity(0);
    await dashboardPage.selectCity(1);
    
    await expect(dashboardPage.citySelector).toBeVisible({ timeout: 10000 });

    const executionTime = (new Date().getTime() - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC2.4_TC1_ID1', 'Seleziona due o più comuni dal menù a tendina', 'I comuni vengono selezionati correttamente', 'Comuni selezionati', true, '', executionTime);
    }
};

export const selectKPI = async function(page, reporter) {
    const startTime = new Date().getTime();
    const dashboardPage = new DashboardPageBenchmarkingKpi(page);

    await dashboardPage.selectKPI();
    
    await expect(dashboardPage.kpiSelector).toBeVisible({ timeout: 10000 });

    const executionTime = (new Date().getTime() - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC2.4_TC1_ID2', 'Scegli un KPI valido per il confronto', 'Il KPI viene accettato', 'KPI selezionato', true, '', executionTime);
    }
};

export const confirmAndVerifyChart = async function(page, reporter) {
    const startTime = new Date().getTime();
    const dashboardPage = new DashboardPageBenchmarkingKpi(page);

    await dashboardPage.applyKPIAndVerify(5000);
    
    const isChartVisible = await dashboardPage.isChartContainerVisible();
    const isPointVisible = await dashboardPage.isChartPointVisible();
    
    if (!isChartVisible && !isPointVisible) {
        throw new Error('Grafico non visibile dopo la conferma');
    }

    const executionTime = (new Date().getTime() - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC2.4_TC1_ID3', 'Conferma la richiesta cliccando sul pulsante', 'Il grafico con il confronto desiderato viene visualizzato', 'Grafico visibile', true, '', executionTime);
    }
};