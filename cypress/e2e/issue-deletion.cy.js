describe('Issue deleting', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
            cy.visit(url + '/board');
    
        });
    });

    it('Issue deletion ', () => {
        cy.get('[data-testid="icon:trash"]').click()
        cy.get('[data-testid="modal:confirm"]').find('button, Delete issue').click()
        
    });
});
