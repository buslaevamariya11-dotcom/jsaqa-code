Cypress.Commands.add('login', (email, password) => {
  cy.contains('Log in').click();
  cy.get('#mail').type(email);
  cy.get('#pass').type(password);
  cy.contains('Submit').click();

  cy.contains('Log out').should('be.visible');
});

Cypress.Commands.add('openBooksList', () => {
  cy.contains('Books list').click();
  cy.contains('Add new', { timeout: 10000 }).should('be.visible');
});

Cypress.Commands.add('openAddBookForm', () => {
  cy.openBooksList();
  cy.contains('Add new').click();
});

Cypress.Commands.add('addBook', (title, description, authors) => {
  cy.openAddBookForm();

  cy.get('#title').type(title);
  cy.get('#description').type(description);
  cy.get('#authors').type(authors);

  cy.contains('Submit').click();
});

Cypress.Commands.add('addBookToFavorites', (title, description, authors) => {
  cy.openAddBookForm();

  cy.get('#title').type(title);
  cy.get('#description').type(description);
  cy.get('#authors').type(authors);
  cy.get('#favorite').check();

  cy.contains('Submit').click();
});

Cypress.Commands.add('openFavorites', () => {
  cy.contains('Favorites').click();
});