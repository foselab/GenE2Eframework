import { test } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { enterCredentials, clickLoginButton, verifyAuthentication } from './UC1_TC1.functions.js';

test("UC1_TC1 - Login con credenziali valide", async ({ page, browserName }) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC1_TC1", "Login con credenziali valide");

    await enterCredentials(page, reporter);
    await clickLoginButton(page, reporter);
    await verifyAuthentication(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});