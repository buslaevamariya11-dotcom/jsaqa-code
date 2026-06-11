describe('Movie booking', () => {
  it('Should book available ticket', () => {
    cy.openClientPage();

    cy.fixture('selectors').then((selectors) => {
      cy.get(selectors.main.day).eq(1).click();

      cy.get(selectors.main.seanceTime)
        .first()
        .click();

      cy.chooseAvailableSeat();

      cy.get(selectors.hall.acceptButton)
        .click();

      cy.contains(selectors.booking.selectedTicketsText)
        .should('be.visible');
    });
  });
});