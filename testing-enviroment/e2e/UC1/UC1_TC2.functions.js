import { expect } from '@playwright/test';

import { LoginPage } from '../../models/page_object_models/login_page.js';

export const enterInvalidCredentials = async function(page, reporter) {
    const startTime = new Date().getTime();
    const loginPage = new LoginPage(page);

    await loginPage.open();
    await loginPage.clickLoginLink();
    await loginPage.fillEmail('invalid_user@example.com');
    await loginPage.fillPassword('wrong_password_123');

    const executionTime = (new Date().getTime() - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC1_TC2_ID1', 'Inserisci credenziali errate nel form di login', 'Il sistema rileva le credenziali come non valide', 'Credenziali inserite nel form', true, '', executionTime);
    }
};

export const submitLogin = async function(page, reporter) {
    const startTime = new Date().getTime();
    const loginPage = new LoginPage(page);

    await loginPage.clickLoginButton();
    await loginPage.waitForErrorMessage();
    await expect(loginPage.errorNotification).toBeVisible({ timeout: 10000 });

    const executionTime = (new Date().getTime() - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC1_TC2_ID2', 'Clicca il tasto "Login"', 'L’utente visualizza un messaggio di errore relativo alle credenziali', 'Messaggio di errore visibile', true, '', executionTime);
    }
};

export const verifyRetryPossibility = async function(page, reporter) {
    const startTime = new Date().getTime();
    const loginPage = new LoginPage(page);

    await expect(loginPage.emailInput).toBeVisible({ timeout: 10000 });
    await expect(loginPage.passwordInput).toBeVisible({ timeout: 10000 });
    await expect(loginPage.loginButton).toBeVisible({ timeout: 10000 });

    const executionTime = (new Date().getTime() - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC1_TC2_ID3', 'Visualizza la possibilità di riprovare l’accesso', 'Il sistema consente all’utente di ripetere il tentativo di login', 'Form di login ancora visibile e interattivo', true, '', executionTime);
    }
};