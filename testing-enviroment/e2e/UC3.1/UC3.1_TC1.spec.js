import { test } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessCensusSection, sortTable, scrollColumns } from './UC3.1_TC1.functions.js';

test("UC3.1_TC1 - Visualizzazione schede censimento con dati validi e ordinamento", async ({ page, browserName }) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC3.1_TC1", "Visualizzazione schede censimento con dati validi e ordinamento");

    await accessCensusSection(page, reporter);
    await sortTable(page, reporter);
    await scrollColumns(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});