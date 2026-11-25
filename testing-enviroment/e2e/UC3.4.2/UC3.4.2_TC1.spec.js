import { test } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { selectDeleteOperation, confirmDeletion } from './UC3.4.2_TC1.functions.js';

test("UC3.4.2_TC1 - Elimina scheda censimento con conferma", async ({ page, browserName }) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC3.4.2_TC1", "Elimina scheda censimento con conferma");

    await accessCensusSheetSection(page, null);
    await selectDeleteOperation(page, reporter);
    await confirmDeletion(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});