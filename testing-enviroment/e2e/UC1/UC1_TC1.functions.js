import { expect } from '@playwright/test';

import { LoginPage } from '../../models/page_object_models/login_page.js';

import { NavbarPage } from '../../models/page_object_models/navbar_page.js';

export const enterCredentials = async function(page, reporter) {
    const startTime = new Date().getTime();
    const loginPage = new LoginPage(page);

    await loginPage.open();
    await loginPage.clickLoginLink();
    await loginPage.fillEmail(process.env.EMAIL);
    await loginPage.fillPassword(process.env.PASSWORD);

    const executionTime = (new Date().getTime() - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC1_TC1_ID1', 'Inserisci le credenziali corrette nel form di login', 'Il sistema accetta le credenziali', 'Credenziali inserite', true, '', executionTime);
    }
};

export const clickLoginButton = async function(page, reporter) {
    const startTime = new Date().getTime();
    const loginPage = new LoginPage(page);

    await loginPage.clickLoginButton();
    await loginPage.waitForAuthentication();

    const executionTime = (new Date().getTime() - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC1_TC1_ID2', 'Clicca il tasto "Login"', 'L’utente viene autenticato con successo', 'Autenticazione completata', true, '', executionTime);
    }
};

export const verifyAuthentication = async function(page, reporter) {
    const startTime = new Date().getTime();
    const navbarPage = new NavbarPage(page);

    await expect(navbarPage.userIcon).toBeVisible({ timeout: 10000 });

    const executionTime = (new Date().getTime() - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC1_TC1_ID3', 'Visualizza il messaggio di operazione completata con successo', 'Il messaggio conferma l’avvenuta autenticazione', 'Icona utente visibile', true, '', executionTime);
    }
};