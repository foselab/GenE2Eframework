import { test } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { selectCities, selectKPI, confirmAndVerifyChart } from './UC2.4_TC1.functions.js';

import { loginToPlatform, openDashboard } from '../UC2/UC2_TC1.functions.js';

test("UC2.4_TC1 - Selezione di comuni e KPI validi per benchmarking", async ({ page, browserName }) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC2.4_TC1", "Selezione di comuni e KPI validi per benchmarking");

    await loginToPlatform(page, null);
    await openDashboard(page, null);
    
    await selectCities(page, reporter);
    await selectKPI(page, reporter);
    await confirmAndVerifyChart(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});