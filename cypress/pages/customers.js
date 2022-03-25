class CustomersPage {
  constructor() {}

  visit() {
    cy.visit(Cypress.env("customersRoute"));
    this.verifyOnCustomersPage();
  }

  verifyOnCustomersPage() {
    cy.url().should("include", Cypress.env("customersRoute"));
  }
}

export default CustomersPage;
