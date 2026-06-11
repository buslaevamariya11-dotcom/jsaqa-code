describe('Main page tests', () => {
  beforeEach(() => {
    cy.openClientPage();
  });

  it('Should show seven days on main page', () => {
    cy.fixture('selectors').then((selectors) => {
      cy.get(selectors.main.day).should('have.length', 7);
    });
  });

  it('Should show movies list on main page', () => {
    cy.fixture('selectors').then((selectors) => {
      cy.get(selectors.main.movie).should('exist');
      cy.get(selectors.main.movieTitle).first().should('be.visible');
    });
  });

  it('Should show available seance time', () => {
    cy.fixture('selectors').then((selectors) => {
      cy.get(selectors.main.seanceTime).first().should('be.visible');
    });
  });
});