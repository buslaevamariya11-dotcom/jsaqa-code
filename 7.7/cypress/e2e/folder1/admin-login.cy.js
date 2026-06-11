describe('Admin login tests', () => {
  beforeEach(() => {
    cy.openAdminPage();
  });

  it('Should login with valid credentials', () => {
    cy.fixture('users').then((users) => {
      cy.loginToAdmin(users.happy.email, users.happy.password);
    });

    cy.contains('Управление залами').should('be.visible');
  });

  it('Should not login with invalid credentials', () => {
    cy.fixture('users').then((users) => {
      cy.loginToAdmin(users.sad.email, users.sad.password);
    });

    cy.contains('Ошибка авторизации!').should('be.visible');
  });
});