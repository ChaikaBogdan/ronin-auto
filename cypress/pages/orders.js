class OrdersPage {
  constructor() {}

  visit() {
    cy.visit(Cypress.env("salesOrderRoute"));
    this.verifyOnOrdersPage;
  }

  verifyOnOrdersPage() {
    cy.url().should("include", Cypress.env("salesOrderRoute"));
  }
}

export default OrdersPage;
