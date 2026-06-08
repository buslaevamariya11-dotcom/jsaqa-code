Cypress.Commands.add('createUser', (firstName, surName) => {
  return cy.request('POST', 'http://localhost:8080/users', {
    firstName,
    surName
  });
});

Cypress.Commands.add('updateUser', (id, firstName, surName) => {
  return cy.request(
    'PUT',
    `http://localhost:8080/users/${id}?firstName=${firstName}&surName=${surName}`
  );
});

Cypress.Commands.add('deleteUser', (id) => {
  return cy.request('DELETE', `http://localhost:8080/users/${id}`);
});