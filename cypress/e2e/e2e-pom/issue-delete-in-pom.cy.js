/**
 * This is an example file and approach for POM in Cypress
 */
import IssueModal from "../../pages/IssueModal";

describe('Issue delete', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
      //open issue detail modal with title from line 16  
      cy.contains(issueTitle).click();
    });
  });

  //issue title, that we are testing with, saved into variable
  const issueTitle = 'This is an issue of type: Task.';
  const trashCan = '[data-testid="icon:trash"]'
  const confWin = '[data-testid="modal:confirm"]'
  const Delete = 'Delete issue'
  const Cancel = 'Cancel'
  const Close = '[data-testid="icon:close"]'


  it('Should delete issue successfully', () => {
    cy.get(trashCan).click()
    cy.get(confWin).contains(Delete).click()

    //Assert that the deletion confirmation dialogue is not visible.
    cy.get(confWin).should('not.exist')
    //Assert that the issue is deleted and no longer displayed on the Jira board.
    cy.reload();
    cy.contains(issueTitle).should('not.exist');
  });
  it.only('Should delete issue successfully 2', () => {
    IssueModal.trashCan
    IssueModal.confWin
    IssueModal.Delete
    IssueModal.validateIssueVisibilityState("This is an issue of type: Task.",false)
    
  });

  it('Should cancel deletion process successfully', () => {
    cy.get(trashCan).click()
    //Cancel the deletion in the confirmation pop-up.
    cy.get(confWin).contains(Cancel).click()
    //Assert that the deletion confirmation dialogue is not visible.
    cy.get(confWin).should('not.exist')
    cy.contains(issueTitle)
    cy.get(Close).click()

    //Assert that the issue is not deleted and is still displayed on the Jira board.
    cy.reload();
    cy.contains(issueTitle).should('exist');
  });
});