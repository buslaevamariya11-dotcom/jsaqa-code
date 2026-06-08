Cypress.Commands.add('openClientPage', () => {
  cy.fixture('urls').then((urls) => {
    cy.visit(urls.client);
  });
});

Cypress.Commands.add('openAdminPage', () => {
  cy.fixture('urls').then((urls) => {
    cy.visit(urls.admin);
  });
});

Cypress.Commands.add('loginToAdmin', (email, password) => {
  cy.fixture('selectors').then((selectors) => {
    cy.get(selectors.admin.email).type(email);
    cy.get(selectors.admin.password).type(password);
    cy.get(selectors.admin.loginButton).click();
  });
});

Cypress.Commands.add('chooseAvailableSeat', () => {
  cy.fixture('selectors').then((selectors) => {
    cy.get(selectors.hall.availableSeat).first().click();
  });
});