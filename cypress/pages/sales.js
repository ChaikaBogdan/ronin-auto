import Navbar from "./navbar";
import SalesOrder from "./salesOrder";
class SalesPage {
  constructor() {
    this.navbar = new Navbar();
    this.salesCheckbox = '[type="checkbox"][id^="ag-"][ref="eInput"]';
    this.bundleActions = '[data-testid="actionBarMenu"] > .MuiButton-label';
    this.deleteAction = '.MuiMenu-list > :nth-child(4) > [tabindex="-1"]';
    this.deleteModalConfirm = ".MuiDialogActions-root > .MuiButton-contained";
  }

  visit() {
    this.interceptSalesOrderOpenLists();
    cy.visit(Cypress.env("salesRoute"));
    this.verifyOnSalesPage();
    this.waitForOrders();
  }

  interceptSalesOrderOpenLists() {
    cy.intercept("GET", Cypress.env("salesOrderOpenListsAPI")).as("orders");
  }

  waitForOrders() {
    cy.wait("@orders");
  }

  verifyOnSalesPage() {
    cy.url().should("include", Cypress.env("salesRoute"));
  }

  expectOrder(firstName, lastName) {
    cy.contains(`${firstName} ${lastName}`);
  }

  inspectOrder(firstName, lastName) {
    cy.contains(`${firstName} ${lastName}`).click();
    return new SalesOrder();
  }

  deleteAllSales() {
    cy.wait("@orders").then((r) => {
      if (r.response.body.length) {
        // TODO: it can be done using delete request also
        cy.get(this.salesCheckbox).as("checkboxes");
        cy.get("@checkboxes").check({ force: true });
        cy.get(this.bundleActions).click();
        cy.get(this.deleteAction).click();
        cy.get(this.deleteModalConfirm).click();
      }
    });
  }
}

export default SalesPage;
