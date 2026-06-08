const { defineConfig } = require('cypress');

module.exports = defineConfig({
  projectId: 'fazds1',

  e2e: {
    specPattern: 'cypress/e2e/**/*.cy.js',
    supportFile: 'cypress/support/e2e.js',

    setupNodeEvents(on, config) {
      return config;
    },
  },
});