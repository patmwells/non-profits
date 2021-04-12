describe('Automation End-To-End Tests', () => {

    it('should load the app successfully', () => {
        cy.visit('/');

        cy.get('div').should('contain', 'Hello IntroCard!');
    });

});
