import { test } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { loginToPlatform, openDashboard } from './UC2_TC1.functions.js';

test("UC2_TC1 - Apertura della dashboard con utente autorizzato", async ({ page, browserName }) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC2_TC1", "Apertura della dashboard con utente autorizzato");

    await loginToPlatform(page, reporter);
    await openDashboard(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});