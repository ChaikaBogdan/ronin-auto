class SalesPage {
  constructor() {}

  visit() {
    cy.visit(Cypress.env("salesRoute"));
  }

  verifyOnSalesPage() {
    cy.url().should("include", Cypress.env("salesRoute"));
  }
}

export default SalesPage;
