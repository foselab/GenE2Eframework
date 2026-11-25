import { test } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { insertValidName, confirmSearch, viewSheetDetails } from './UC3.2.1_TC1.functions.js';

import { accessSearchSection } from '../UC3.2/UC3.2_TC1.functions.js';

test("UC3.2.1_TC1 - Ricerca scheda censimento per nome con risultati validi", async ({ page, browserName }) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC3.2.1_TC1", "Ricerca scheda censimento per nome con risultati validi");

    await accessSearchSection(page, null);
    await insertValidName(page, reporter);
    await confirmSearch(page, reporter);
    await viewSheetDetails(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});