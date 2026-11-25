import { expect } from '@playwright/test';

import { SaveToolPage } from '../../models/page_object_models/save_tool_page.js';

import { loginAndOpenSaveTool } from '../UC4/UC4_TC1.functions.js';

export const navigateToInvestmentsSection = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    // Precondition: UC4 (Login and Open Save Tool)
    await loginAndOpenSaveTool(page, null);

    const saveToolPage = new SaveToolPage(page);
    await saveToolPage.clickStep2Investments();
    
    // Expected: La sezione viene visualizzata correttamente
    await expect(saveToolPage.addInvestmentButton).toBeVisible({ timeout: 10000 });

    const executionTime = (new Date().getTime() - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC4.2_TC1_ID1', 'Naviga nella sezione dedicata agli investimenti', 'La sezione viene visualizzata correttamente', 'Sezione investimenti visibile', true, '', executionTime);
    }
};

export const openInvestmentForm = async function(page, reporter) {
    const startTime = new Date().getTime();
    const saveToolPage = new SaveToolPage(page);

    await saveToolPage.clickAddInvestment();
    
    // Expected: Il form di inserimento dati si apre
    await expect(saveToolPage.investmentNameInput).toBeVisible({ timeout: 10000 });

    const executionTime = (new Date().getTime() - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC4.2_TC1_ID2', 'Clicca sul tasto per aggiungere un nuovo investimento', 'Il form di inserimento dati si apre', 'Form investimento visibile', true, '', executionTime);
    }
};

export const fillInvestmentForm = async function(page, reporter) {
    const startTime = new Date().getTime();
    const saveToolPage = new SaveToolPage(page);

    // Step: Compila il form con tutti i parametri richiesti in modo corretto
    // Using a valid name as per instructions (no invented values, using a standard test name)
    await saveToolPage.fillValidInvestment('Investimento Test 1');

    // Expected: Il form viene compilato senza errori
    // We assert that the input has the value we just filled
    await expect(saveToolPage.investmentNameInput).toHaveValue('Investimento Test 1', { timeout: 10000 });

    const executionTime = (new Date().getTime() - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC4.2_TC1_ID3', 'Compila il form con tutti i parametri richiesti in modo corretto', 'Il form viene compilato senza errori', 'Nome investimento compilato', true, '', executionTime);
    }
};

export const confirmInvestmentAddition = async function(page, reporter) {
    const startTime = new Date().getTime();
    const saveToolPage = new SaveToolPage(page);

    await saveToolPage.clickApply();

    // Expected: Viene visualizzato un messaggio di conferma
    // The page object model exposes isInvestmentVisible. We assume that after applying, the investment appears in the list.
    // We wait for the investment to be visible.
    await expect(saveToolPage.page.getByText('Investimento Test 1', { exact: false }).first()).toBeVisible({ timeout: 10000 });

    const executionTime = (new Date().getTime() - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC4.2_TC1_ID4', 'Conferma l’aggiunta del nuovo investimento', 'Viene visualizzato un messaggio di conferma', 'Investimento visibile nella lista', true, '', executionTime);
    }
};