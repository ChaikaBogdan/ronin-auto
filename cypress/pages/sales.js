class SalesPage {
  constructor() {}

  visit() {
    this.interseptSalesOrderOpenLists();
    cy.visit(Cypress.env("salesRoute"));
    this.verifyOnSalesPage();
    this.waitForOrders();
  }

  interseptSalesOrderOpenLists() {
    cy.intercept("GET", Cypress.env("salesOrderOpenListsAPI")).as("orders");
  }

  waitForOrders() {
    cy.wait("@orders");
  }

  verifyOnSalesPage() {
    cy.url().should("include", Cypress.env("salesRoute"));
  }
}

export default SalesPage;
