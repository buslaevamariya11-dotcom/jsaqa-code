const { defineConfig } = require('cypress');

module.exports = defineConfig({
  projectId: '9p4qik',

  e2e: {
    specPattern: 'cypress/e2e/**/*.cy.js',
    supportFile: 'cypress/support/e2e.js',

    setupNodeEvents(on, config) {
      return config;
    },
  },
});