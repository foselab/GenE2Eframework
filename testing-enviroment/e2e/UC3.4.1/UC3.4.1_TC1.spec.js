import { test } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { selectDownloadOperation, verifyDownloadCompletion } from './UC3.4.1_TC1.functions.js';

test("UC3.4.1_TC1 - Download scheda censimento con successo", async ({ page, browserName }) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC3.4.1_TC1", "Download scheda censimento con successo");

    await selectDownloadOperation(page, reporter);
    await verifyDownloadCompletion(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});