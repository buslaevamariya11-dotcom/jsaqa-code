describe('Users API tests', () => {
  it('Create user', () => {
    cy.createUser('Maria', 'Buslaeva').then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.id).to.exist;
      expect(response.body.firstName).to.eq('Maria');
      expect(response.body.surName).to.eq('Buslaeva');
    });
  });

  it('Update user', () => {
    cy.createUser('Old', 'User').then((createResponse) => {
      const userId = createResponse.body.id;

      cy.updateUser(userId, 'New', 'Name').then((updateResponse) => {
        expect(updateResponse.status).to.eq(200);
        expect(updateResponse.body.id).to.eq(userId);
        expect(updateResponse.body.firstName).to.eq('New');
        expect(updateResponse.body.surName).to.eq('Name');
      });
    });
  });

  it('Delete user', () => {
    cy.createUser('Delete', 'Me').then((createResponse) => {
      const userId = createResponse.body.id;

      cy.deleteUser(userId).then((deleteResponse) => {
        expect(deleteResponse.status).to.eq(200);
      });
    });
  });
});