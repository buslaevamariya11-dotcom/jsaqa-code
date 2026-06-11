describe('Days navigation additional tests', () => {
  beforeEach(() => {
    cy.openClientPage();
  });

  it('Should allow user to choose another day', () => {
    cy.fixture('selectors').then((selectors) => {
      cy.get(selectors.main.day).eq(1).click();
      cy.get(selectors.main.day).eq(1).should('have.class', 'page-nav__day_chosen');
    });
  });
});