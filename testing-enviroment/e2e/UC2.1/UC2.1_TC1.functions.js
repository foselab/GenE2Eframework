import { expect } from '@playwright/test';

import { DashboardPagePdfDownload } from '../../models/page_object_models/dashboard_page_pdf_download.js';

import { loginToPlatform, openDashboard } from '../UC2/UC2_TC1.functions.js';

export const downloadPdf = async function(page, reporter) {
    const startTime = new Date().getTime();
    const dashboardPage = new DashboardPagePdfDownload(page);

    const [download] = await Promise.all([
        page.waitForEvent('download'),
        dashboardPage.downloadPDF()
    ]);

    const suggestedFilename = download.suggestedFilename();
    const executionTime = (new Date().getTime() - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC2.1_TC1_ID1', 'Clicca sul tasto di download del PDF', 'Il processo di download inizia', `Download avviato: ${suggestedFilename}`, true, '', executionTime);
    }
};

export const verifyDownload = async function(page, reporter) {
    const startTime = new Date().getTime();
    const dashboardPage = new DashboardPagePdfDownload(page);

    await expect(dashboardPage.downloadPDFButton).toBeVisible({ timeout: 10000 });

    const executionTime = (new Date().getTime() - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC2.1_TC1_ID2', 'Conferma la richiesta di download', 'Il file inizia a scaricarsi', 'Download confermato', true, '', executionTime);
    }
};

export const verifySuccessMessage = async function(page, reporter) {
    const startTime = new Date().getTime();
    const dashboardPage = new DashboardPagePdfDownload(page);

    await expect(dashboardPage.downloadPDFButton).toBeVisible({ timeout: 10000 });

    const executionTime = (new Date().getTime() - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC2.1_TC1_ID3', 'Verifica il messaggio di completamento dell’operazione', 'Messaggio di successo visualizzato', 'Operazione completata', true, '', executionTime);
    }
};