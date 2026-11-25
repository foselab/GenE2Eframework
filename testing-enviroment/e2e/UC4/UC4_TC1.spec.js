import { test } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { loginAndOpenSaveTool, verifySaveToolInterface } from './UC4_TC1.functions.js';

test("UC4_TC1 - Apertura modulo SAVE con successo", async ({ page, browserName }) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC4_TC1", "Apertura modulo SAVE con successo");

    await loginAndOpenSaveTool(page, reporter);
    await verifySaveToolInterface(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});