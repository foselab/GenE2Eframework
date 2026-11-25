import { test } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { loginAsRegisteredUser, initiateLogout, confirmLogoutSuccess } from './UC6_TC1.functions.js';

test("UC6_TC1 - Logout utente con successo", async ({ page, browserName }) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC6_TC1", "Logout utente con successo");

    await loginAsRegisteredUser(page, reporter);
    await initiateLogout(page, reporter);
    await confirmLogoutSuccess(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});