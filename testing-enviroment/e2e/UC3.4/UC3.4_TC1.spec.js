import { test } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessCensusSheetSection, clickActionsButton } from './UC3.4_TC1.functions.js';

test("UC3.4_TC1 - Visualizzazione azioni disponibili sulla scheda censimento", async ({ page, browserName }) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC3.4_TC1", "Visualizzazione azioni disponibili sulla scheda censimento");

    await accessCensusSheetSection(page, reporter);
    await clickActionsButton(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});