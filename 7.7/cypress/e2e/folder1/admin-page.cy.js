describe('Admin page additional tests', () => {
  beforeEach(() => {
    cy.openAdminPage();

    cy.fixture('users').then((users) => {
      cy.loginToAdmin(users.happy.email, users.happy.password);
    });
  });

  it('Should show admin page after successful login', () => {
    cy.contains('Управление залами').should('be.visible');
  });
});