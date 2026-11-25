require('dotenv').config({ path: '../.env' });

// MODIFICHE EDO
// const dotenvResult = require('dotenv').config({ path: '../.env' });
// if (dotenvResult.error) {
//   console.error('Error loading .env file:', dotenvResult.error);
// } else {
//   console.log('Loaded .env file successfully');
// }

module.exports = {
  baseURL: process.env.E2E_BASE_URL || 'default_base_url',
  loginURL: process.env.E2E_LOGIN_URL || 'default_login_url',
  homeURL: process.env.E2E_HOME_URL || 'default_home_url',
  dashboardURL: process.env.E2E_DASHBOARD_URL || 'default_dashboard_url',
  schedaCensimentoURL: process.env.E2E_CTS_URL || 'default_census_url'
};
