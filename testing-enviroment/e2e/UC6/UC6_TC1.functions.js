import { expect } from '@playwright/test';

import { NavbarPage } from '../../models/page_object_models/navbar_page.js';

import { enterCredentials, clickLoginButton, verifyAuthentication } from '../UC1/UC1_TC1.functions.js';

export const loginAsRegisteredUser = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    await enterCredentials(page, null);
    await clickLoginButton(page, null);
    await verifyAuthentication(page, null);

    const executionTime = (new Date().getTime() - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC6_TC1_ID1', 'Accedi al sistema come utente registrato', 'La dashboard dell’utente viene visualizzata', 'Autenticazione completata', true, '', executionTime);
    }
};

export const initiateLogout = async function(page, reporter) {
    const startTime = new Date().getTime();
    const navbarPage = new NavbarPage(page);

    await navbarPage.clickUserIcon();
    await navbarPage.clickLogout();

    const executionTime = (new Date().getTime() - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC6_TC1_ID2', 'Clicca sul proprio nome utente in alto a destra e seleziona il tasto “Logout”', 'Il processo di logout inizia', 'Logout avviato', true, '', executionTime);
    }
};

export const confirmLogoutSuccess = async function(page, reporter) {
    const startTime = new Date().getTime();
    const navbarPage = new NavbarPage(page);

    await expect(navbarPage.userIcon).not.toBeVisible({ timeout: 10000 });

    const executionTime = (new Date().getTime() - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC6_TC1_ID3', 'Conferma l’intenzione di effettuare il logout', 'Un messaggio di successo conferma la disconnessione', 'Utente non più autenticato', true, '', executionTime);
    }
};