describe('Issue details editing', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.url().should('eq', `${Cypress.env('baseUrl')}project`).then((url) => {
            cy.visit(url + '/board');
            cy.contains('This is an issue of type: Task.').click();
        });
    });

    it('Test case 1:Issue deletion', () => {
        cy.get('[data-testid="icon:trash"]').click()
        cy.get('[data-testid="modal:confirm"]').contains('Delete issue').click()

        //Assert that the deletion confirmation dialogue is not visible.
        cy.get('[data-testid="modal:confirm"]').should('not.exist')
        //Assert that the issue is deleted and no longer displayed on the Jira board.
        cy.reload();
        cy.contains('This is an issue of type: Task.').should('not.exist');
    });


    it('Test case 2:Issue deletion cancellation', () => {
        cy.get('[data-testid="icon:trash"]').click()
        //Cancel the deletion in the confirmation pop-up.
        cy.get('[data-testid="modal:confirm"]').contains('Cancel').click()
        //Assert that the deletion confirmation dialogue is not visible.
        cy.get('[data-testid="modal:confirm"]').should('not.exist')
        cy.contains('This is an issue of type: Task.')
        cy.get('[data-testid="icon:close"]').eq(0).click()

        //Assert that the issue is not deleted and is still displayed on the Jira board.
        cy.reload();
        cy.contains('This is an issue of type: Task.').should('exist');

    });
    });



