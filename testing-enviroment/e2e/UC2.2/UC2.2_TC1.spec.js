import { test } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { selectSearchParameters, confirmSearch, viewPlantDetails } from './UC2.2_TC1.functions.js';

import { loginToPlatform, openDashboard } from '../UC2/UC2_TC1.functions.js';

test("UC2.2_TC1 - Ricerca impianti di illuminazione con parametri validi", async ({ page, browserName }) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC2.2_TC1", "Ricerca impianti di illuminazione con parametri validi");

    await loginToPlatform(page, null);
    await openDashboard(page, null);
    
    await selectSearchParameters(page, reporter);
    await confirmSearch(page, reporter);
    await viewPlantDetails(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});