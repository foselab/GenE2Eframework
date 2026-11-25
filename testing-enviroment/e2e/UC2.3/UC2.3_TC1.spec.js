import { test } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessDashboard, viewGeneralDataTable, verifyTableFunctionality } from './UC2.3_TC1.functions.js';

test("UC2.3_TC1 - Visualizzazione tabella dati generali con impostazioni predefinite", async ({ page, browserName }) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC2.3_TC1", "Visualizzazione tabella dati generali con impostazioni predefinite");

    await accessDashboard(page, reporter);
    await viewGeneralDataTable(page, reporter);
    await verifyTableFunctionality(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});