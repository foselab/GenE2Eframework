import { test } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { openDetailPage, attemptEditField, verifyNoEditOptions } from './UC3.4.5_TC2.functions.js';

test("UC3.4.5_TC2 - Tentativo di modifica dei dati in pagina di dettaglio", async ({ page, browserName }) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC3.4.5_TC2", "Tentativo di modifica dei dati in pagina di dettaglio");

    await openDetailPage(page, reporter);
    await attemptEditField(page, reporter);
    await verifyNoEditOptions(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});