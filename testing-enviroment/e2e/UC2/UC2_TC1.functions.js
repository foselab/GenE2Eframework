import { expect } from '@playwright/test';

import { SidebarPage } from '../../models/page_object_models/sidebar_page.js';

import { enterCredentials, clickLoginButton, verifyAuthentication } from '../UC1/UC1_TC1.functions.js';

export const loginToPlatform = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    await enterCredentials(page, null);
    await clickLoginButton(page, null);
    await verifyAuthentication(page, null);

    const executionTime = (new Date().getTime() - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC2_TC1_ID1', 'Accedi alla piattaforma come utente registrato', 'La home page della piattaforma è visibile', 'Autenticazione completata', true, '', executionTime);
    }
};

export const openDashboard = async function(page, reporter) {
    const startTime = new Date().getTime();
    const sidebarPage = new SidebarPage(page);

    await sidebarPage.clickDashboardLink();
    await expect(page).toHaveURL(process.env.E2E_DASHBOARD_URL, { timeout: 20000 });

    const executionTime = (new Date().getTime() - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC2_TC1_ID2', 'Seleziona la voce di menù relativa alla dashboard', 'La sezione della dashboard si apre correttamente', 'URL dashboard raggiunto', true, '', executionTime);
    }
};