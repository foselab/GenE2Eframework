const mysql = require('mysql2/promise');  // mysql2/promise per gestire le connessioni in modo asincrono
require('dotenv').config({ path: '../.env' });

const dbConfig = {
  host: process.env.DB_HOST_pell_ip || 'localhost',
  user: process.env.DB_USERNAME_pell_ip || 'root',
  password: process.env.DB_PASSWORD_pell_ip || '',
  database: process.env.DB_DATABASE_pell_ip || 'default_database',
};

async function saveTestResults(testCaseId, testCaseDescription, browserName, steps) {
  console.log("[DEBUG] Chiamato saveTestResults");

  const connection = await mysql.createConnection(dbConfig);  // Crea una connessione al database

  try {
    console.log("[DEBUG] Connessione al DB riuscita");

    const [rows] = await connection.execute(
      `SELECT COUNT(*) as count FROM test_cases WHERE test_case_id = ? AND browser_name = ?`,
      [testCaseId || null, browserName || null]
    );
    const testNumber = rows[0].count + 1;

    const [testCaseResult] = await connection.execute(
      `INSERT INTO test_cases (test_case_id, test_description, test_number, browser_name, execution_date, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        testCaseId || null,
        testCaseDescription || null,
        testNumber,
        browserName || null,
        new Date(),
        new Date(),
        new Date()
      ]
    );

    console.log("[DEBUG] Inserimento nella tabella test_cases riuscito");

    const testCaseDbId = testCaseResult.insertId;

    for (const step of steps) {
      await connection.execute(
        `INSERT INTO test_case_steps (test_case_id, step_id, step_description, parameters_used, execution_time, expected_results, actual_results, pass_fail, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          testCaseDbId || null,
          step.step_id || null,
          step.step_description || null,
          step.parameters_used || null,
          step.execution_time || 0,
          step.expected_results || null,
          step.actual_results || null,
          step.pass_fail === null ? null : step.pass_fail,
          new Date(),
          new Date()
        ]
      );

      console.log(`[DEBUG] Step ${step.step_id} salvato correttamente nel DB`);
    }
  } catch (error) {
    console.error("[DEBUG] Errore durante il salvataggio nel DB:", error);
  } finally {
    await connection.end();  // Chiude la connessione al database
    console.log("[DEBUG] Connessione al DB chiusa");
  }
}

module.exports = { saveTestResults };
