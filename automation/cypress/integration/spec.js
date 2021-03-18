describe('First tests', () => {
    it('Finds hello world!', () => {
        cy.visit('/');

        cy.get('div').should('contain', 'Hello World!');
    });
});
