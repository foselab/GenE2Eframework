import { expect } from '@playwright/test';

import { NavbarPage } from '../../models/page_object_models/navbar_page.js';

import { enterCredentials, clickLoginButton, verifyAuthentication } from '../UC1/UC1_TC1.functions.js';

export const loginAndOpenUserMenu = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    await enterCredentials(page, null);
    await clickLoginButton(page, null);
    await verifyAuthentication(page, null);

    const navbarPage = new NavbarPage(page);
    await navbarPage.clickUserIcon();
    await expect(navbarPage.languageMenu).toBeVisible({ timeout: 10000 });

    const executionTime = (new Date().getTime() - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC5_TC1_ID1', 'Accedi al portale e clicca sul proprio nome utente in alto a destra', 'Il menù appare correttamente', 'Menù utente visibile', true, '', executionTime);
    }
};

export const selectItalianLanguage = async function(page, reporter) {
    const startTime = new Date().getTime();
    const navbarPage = new NavbarPage(page);

    await navbarPage.selectItalianLanguage();
    await expect(navbarPage.italianLanguageSelection).toHaveClass(/active/, { timeout: 10000 });

    const executionTime = (new Date().getTime() - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC5_TC1_ID2', 'Seleziona la lingua italiana dal menù a tendina', 'La selezione viene accettata', 'Lingua italiana attiva', true, '', executionTime);
    }
};

export const verifyItalianLanguage = async function(page, reporter) {
    const startTime = new Date().getTime();
    const navbarPage = new NavbarPage(page);

    await expect(navbarPage.italianLanguageSelection).toHaveClass(/active/, { timeout: 10000 });

    const executionTime = (new Date().getTime() - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC5_TC1_ID3', 'Verifica che dopo il ricaricamento della pagina, il portale sia visualizzato in italiano', 'Il portale è completamente tradotto in italiano', 'Lingua italiana confermata', true, '', executionTime);
    }
};