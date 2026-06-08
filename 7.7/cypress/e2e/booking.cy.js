describe('Movie booking', () => {
  it('Should book available ticket for movie from admin panel', () => {
    cy.fixture('users').then((users) => {
      cy.openAdminPage();
      cy.loginToAdmin(users.happy.email, users.happy.password);
    });

    cy.fixture('selectors').then((selectors) => {
      cy.get(selectors.admin.movieTitle)
        .first()
        .invoke('text')
        .then((titleFromAdmin) => {
          const movieTitle = titleFromAdmin.trim();

          cy.visit('https://qamid.tmweb.ru');

          cy.contains(selectors.main.movie, movieTitle)
            .should('be.visible')
            .within(() => {
              cy.get(selectors.main.seanceTime).first().click();
            });

          cy.chooseAvailableSeat();

          cy.get(selectors.hall.acceptButton).click();

          cy.contains(selectors.booking.selectedTicketsText).should('be.visible');
        });
    });
  });
});