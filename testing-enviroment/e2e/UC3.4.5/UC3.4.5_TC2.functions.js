import { expect } from '@playwright/test';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

import { accessCensusSheetSection } from '../UC3.4/UC3.4_TC1.functions.js';

export const openDetailPage = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    await accessCensusSheetSection(page, null);
    
    const censusSheetPage = new CensusSheetPage(page);
    await censusSheetPage.clickAzioneDettaglio();
    
    await expect(censusSheetPage.searchInput).toBeVisible({ timeout: 10000 });

    const executionTime = (new Date().getTime() - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3.4.5_TC2_ID1', 'Apri la pagina di dettaglio di una scheda censimento', 'La pagina si apre in modalità sola lettura', 'Pagina di dettaglio aperta', true, '', executionTime);
    }
};

export const attemptEditField = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const censusSheetPage = new CensusSheetPage(page);
    
    const inputField = page.locator('input[type="text"]').first();
    await inputField.click();
    await inputField.fill('test');
    
    const errorMessage = page.getByRole('alert').first();
    await expect(errorMessage).toBeVisible({ timeout: 10000 });
    const errorText = await errorMessage.innerText();

    const executionTime = (new Date().getTime() - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3.4.5_TC2_ID2', 'Tenta di modificare un campo dei dati generali dell’area', 'Il sistema non permette la modifica e visualizza un messaggio di errore', errorText, true, '', executionTime);
    }
};

export const verifyNoEditOptions = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const censusSheetPage = new CensusSheetPage(page);
    
    const editButton = page.getByRole('button', { name: 'Modifica' });
    await expect(editButton).toHaveCount(0, { timeout: 10000 });

    const executionTime = (new Date().getTime() - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3.4.5_TC2_ID3', 'Verifica che non ci siano opzioni di editing disponibili', 'Non sono presenti pulsanti o link per modificare i dati', 'Nessun pulsante di modifica trovato', true, '', executionTime);
    }
};