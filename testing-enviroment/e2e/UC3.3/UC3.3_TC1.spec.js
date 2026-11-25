import { test } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { openUploadModal, uploadValidFile, confirmUpload } from './UC3.3_TC1.functions.js';

test("UC3.3_TC1 - Caricamento scheda censimento con dati validi e formato supportato", async ({ page, browserName }) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC3.3_TC1", "Caricamento scheda censimento con dati validi e formato supportato");

    // Precondition: UC3
    const { loginAndAccessDashboard, openCensusSheetSection } = await import('../UC3/UC3_TC1.functions.js');
    await loginAndAccessDashboard(page, null);
    await openCensusSheetSection(page, null);

    await openUploadModal(page, reporter);
    await uploadValidFile(page, reporter);
    await confirmUpload(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});