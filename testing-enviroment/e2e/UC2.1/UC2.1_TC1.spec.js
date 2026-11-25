import { test } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { loginToPlatform, openDashboard } from '../UC2/UC2_TC1.functions.js';

import { downloadPdf, verifyDownload, verifySuccessMessage } from './UC2.1_TC1.functions.js';

test("UC2.1_TC1 - Download PDF con successo", async ({ page, browserName }) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC2.1_TC1", "Download PDF con successo");

    await loginToPlatform(page, null);
    await openDashboard(page, null);
    await downloadPdf(page, reporter);
    await verifyDownload(page, reporter);
    await verifySuccessMessage(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});