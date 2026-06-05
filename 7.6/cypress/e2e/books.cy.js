describe('Books app tests', () => {
  beforeEach(() => {
    cy.visit('/booksNode');
  });

  it('Should open the main page', () => {
    cy.contains('Books list').should('be.visible');
    cy.contains('Log in').should('be.visible');
  });

  it('Should successfully login', () => {
    cy.login('test@test.com', 'test');
  });

  it('Should not login with empty login', () => {
    cy.contains('Log in').click();
    cy.get('#mail').type(' ');
    cy.get('#pass').type('test');
    cy.contains('Submit').click();

    cy.get('#mail')
      .then(($el) => $el[0].checkValidity())
      .should('be.false');
  });

  it('Should not login with empty password', () => {
    cy.contains('Log in').click();
    cy.get('#mail').type('test@test.com');
    cy.contains('Submit').click();

    cy.get('#pass')
      .then(($el) => $el[0].checkValidity())
      .should('be.false');
  });

  it('Should add book to list', () => {
    cy.login('test@test.com', 'test');
    cy.addBook('Harry Potter', 'Book about wizard', 'Joanne Rowling');

    cy.contains('Harry Potter').should('be.visible');
  });

  it('Should add book to favorites from book creation form', () => {
    cy.login('test@test.com', 'test');
    cy.addBookToFavorites('The Lord of the Rings', 'Book about Middle-earth', 'John Tolkien');

    cy.openFavorites();
    cy.contains('The Lord of the Rings').should('be.visible');
  });

  it('Should move existing book to favorites', () => {
    cy.login('test@test.com', 'test');
    cy.addBook('Fahrenheit 451', 'Dystopian novel', 'Ray Bradbury');

    cy.contains('Fahrenheit 451')
      .parent()
      .contains('Add to favorite')
      .click();

    cy.openFavorites();
    cy.contains('Fahrenheit 451').should('be.visible');
  });

  it('Should remove book from favorites', () => {
    cy.login('test@test.com', 'test');
    cy.addBookToFavorites('The Master and Margarita', 'Novel', 'Mikhail Bulgakov');

    cy.openFavorites();

    cy.contains('The Master and Margarita')
      .parent()
      .contains('Delete from favorite')
      .click();

    cy.contains('The Master and Margarita').should('not.exist');
  });
});