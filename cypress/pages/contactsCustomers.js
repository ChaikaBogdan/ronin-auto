class contactsCustomersPage {
  constructor() {
    this.customersCheckbox =
      'input[type="checkbox"][id^="ag-"][ref="eInput"][tabindex="-1"]';
    this.bundleActions = "nav > .MuiButtonBase-root > .MuiButton-label";
    this.deleteAction = ".MuiListItemText-root > .MuiTypography-root";
    this.deleteModalConfirm = ".MuiDialogActions-root > .MuiButton-contained";
  }

  visit() {
    cy.intercept("https://customers.katanamrp.com/api/customers*").as(
      "customers"
    );
    cy.visit(Cypress.env("contactsCustomersRoute"));
    this.verifyOnContactsCustomersPage();
  }

  verifyOnContactsCustomersPage() {
    cy.url().should("include", Cypress.env("contactsCustomersRoute"));
  }

  expectCustomer(email) {
    cy.contains(email);
  }

  deleteAllCustomers() {
    cy.wait("@customers").then((r) => {
      if (r.response.body.length) {
        cy.intercept("**/customers/bulkDelete").as("delete");
        // TODO: it can be done using delete request also
        cy.get(this.customersCheckbox).as("checkboxes");
        cy.get("@checkboxes").check({ force: true });
        cy.get(this.bundleActions).click();
        cy.get(this.deleteAction).click();
        cy.wait("@delete");
      }
    });
  }

  verifyCustomersCount(count) {
    cy.wait("@customers").then((r) => {
      expect(r.response.body.length).to.eq(count);
    });
  }
}

export default contactsCustomersPage;
