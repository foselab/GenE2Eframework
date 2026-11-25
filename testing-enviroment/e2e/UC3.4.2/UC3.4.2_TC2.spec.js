import { test } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { selectDeleteOperation, cancelDeleteOperation } from './UC3.4.2_TC2.functions.js';

test("UC3.4.2_TC2 - Annullamento eliminazione scheda censimento", async ({ page, browserName }) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC3.4.2_TC2", "Annullamento eliminazione scheda censimento");

    await accessCensusSheetSection(page, null);
    await selectDeleteOperation(page, reporter);
    await cancelDeleteOperation(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});