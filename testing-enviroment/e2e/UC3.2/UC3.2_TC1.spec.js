import { test } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessSearchSection, insertValidParameters, executeSearch } from './UC3.2_TC1.functions.js';

test("UC3.2_TC1 - Ricerca con parametri validi", async ({ page, browserName }) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC3.2_TC1", "Ricerca con parametri validi");

    await accessSearchSection(page, reporter);
    await insertValidParameters(page, reporter);
    await executeSearch(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});