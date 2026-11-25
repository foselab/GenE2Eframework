import { expect } from '@playwright/test';

import { SaveToolPage } from '../../models/page_object_models/save_tool_page.js';

import { enterCredentials, clickLoginButton, verifyAuthentication } from '../UC1/UC1_TC1.functions.js';

export const loginAndOpenSaveTool = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    // Precondition: UC1 (Login)
    await enterCredentials(page, null);
    await clickLoginButton(page, null);
    await verifyAuthentication(page, null);

    // Step 1: Accedi alla sezione relativa al modulo SAVE
    const saveToolPage = new SaveToolPage(page);
    await saveToolPage.open();
    
    // Expected: La sezione del modulo SAVE viene visualizzata
    await expect(saveToolPage.step2Tab).toBeVisible({ timeout: 10000 });

    const executionTime = (new Date().getTime() - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC4_TC1_ID1', 'Accedi alla sezione relativa al modulo SAVE tramite il menù laterale di sinistra', 'La sezione del modulo SAVE viene visualizzata', 'Sezione SAVE visibile', true, '', executionTime);
    }
};

export const verifySaveToolInterface = async function(page, reporter) {
    const startTime = new Date().getTime();
    const saveToolPage = new SaveToolPage(page);

    // Step 2: Verifica la presenza di tutti gli elementi dell’interfaccia
    // Expected: Tutti gli elementi sono presenti e visibili
    // We check the main elements exposed by the page object model
    await expect(saveToolPage.step2Tab).toBeVisible({ timeout: 10000 });
    await expect(saveToolPage.addInvestmentButton).toBeVisible({ timeout: 10000 });
    await expect(saveToolPage.applyButton).toBeVisible({ timeout: 10000 });
    await expect(saveToolPage.backButton).toBeVisible({ timeout: 10000 });

    const executionTime = (new Date().getTime() - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC4_TC1_ID2', 'Verifica la presenza di tutti gli elementi dell’interfaccia', 'Tutti gli elementi sono presenti e visibili', 'Elementi interfaccia SAVE visibili', true, '', executionTime);
    }
};