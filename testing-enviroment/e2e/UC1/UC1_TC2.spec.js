import { test } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { enterInvalidCredentials, submitLogin, verifyRetryPossibility } from './UC1_TC2.functions.js';

test("UC1_TC2 - Login con credenziali errate", async ({ page, browserName }) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC1_TC2", "Login con credenziali errate");

    await enterInvalidCredentials(page, reporter);
    await submitLogin(page, reporter);
    await verifyRetryPossibility(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});