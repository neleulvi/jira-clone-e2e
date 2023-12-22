describe("Time tracking functionality", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.url()
      .should("eq", `${Cypress.env("baseUrl")}project/board`)
      .then((url) => {
        cy.visit(url + "/board");
        cy.contains("This is an issue of type: Task.").click();
      });
  });

  const getIssueDetailsModal = () =>
    cy.get('[data-testid="modal:issue-details"]');
  const getTimeTrackingModal = () => cy.get('[data-testid="modal:tracking"]');

  it("Should add, edit and delete estimation time", () => {
    //Adding estimation.
    getIssueDetailsModal().within(() => {
      cy.get('[placeholder="Number"]').click().clear().type("10");

      //Asserting that the estimation is added and visible.
      cy.contains("div", "10h estimated").should("be.visible");

      //Editing the estimation.
      cy.get('[placeholder="Number"]').click().clear().type("12");

      //Asserting that the updated value is visible.
      cy.contains("div", "12h estimated").should("be.visible");

      //Removing the estimation.
      cy.get('[placeholder="Number"]').click().clear();

      //Asserting that the value is removed.
      cy.contains("div", "12h estimated").should("not.exist");
    });
  });

  it.only("Should log, edit and delete logged time", () => {
    getIssueDetailsModal().within(() => {
      //Log time.
      cy.get('[data-testid="icon:stopwatch"]').click();
    });

    getTimeTrackingModal().within(() => {
      cy.get('[placeholder="Number"]').first().click().clear().type("8");
      cy.contains("button", "Done").click().should("not.exist");
    });

    //Asserting that the logged time is added and visible.
    getIssueDetailsModal().within(() => {
      cy.contains("div", "8h logged").should("exist");
    });
    //Editing the logged time.
    getTimeTrackingModal().within(() => {
      cy.get('[placeholder="Number"]').first().click().clear().type("6");
      cy.contains("button", "Done").click().should("not.exist");
    });
    //Asserting that the updated value is visible.
    getIssueDetailsModal().within(() => {
      cy.contains("div", "6h logged").should("exist");
    });
    //Removing the logged time.
    getTimeTrackingModal().within(() => {
      cy.get('[placeholder="Number"]').first().click().clear();
      cy.contains("button", "Done").click().should("not.exist");
    });
    //Asserting that the value is removed.
    getIssueDetailsModal().within(() => {
      cy.contains("div", "No time logged").should("exist");
    });
  });
});
