import { test } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { navigateToInvestmentsSection, openInvestmentForm, fillInvestmentForm, confirmInvestmentAddition } from './UC4.2_TC1.functions.js';

test("UC4.2_TC1 - Aggiunta nuovo investimento con dati validi", async ({ page, browserName }) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC4.2_TC1", "Aggiunta nuovo investimento con dati validi");

    await navigateToInvestmentsSection(page, reporter);
    await openInvestmentForm(page, reporter);
    await fillInvestmentForm(page, reporter);
    await confirmInvestmentAddition(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});