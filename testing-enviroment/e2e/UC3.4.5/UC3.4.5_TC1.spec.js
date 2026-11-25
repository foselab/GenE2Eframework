import { test } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { selectDetailOperation, verifyGeneralData, navigateHierarchy } from './UC3.4.5_TC1.functions.js';

test("UC3.4.5_TC1 - Visualizzazione dettaglio scheda censimento con dati validi", async ({ page, browserName }) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC3.4.5_TC1", "Visualizzazione dettaglio scheda censimento con dati validi");

    await selectDetailOperation(page, reporter);
    await verifyGeneralData(page, reporter);
    await navigateHierarchy(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});