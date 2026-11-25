import { test } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { loginAndAccessDashboard, openCensusSheetSection } from './UC3_TC1.functions.js';

test("UC3_TC1 - Apertura interfaccia gestione schede censimento con successo", async ({ page, browserName }) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC3_TC1", "Apertura interfaccia gestione schede censimento con successo");

    await loginAndAccessDashboard(page, reporter);
    await openCensusSheetSection(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});