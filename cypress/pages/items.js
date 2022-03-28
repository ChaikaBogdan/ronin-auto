class ItemsPage {
  constructor() {
    this.itemsCheckbox =
      'input[type="checkbox"][id^="ag-"][ref="eInput"][tabindex="-1"]';
    this.bundleActions =
      '[data-testid="actionsBarMenuButton"] > .MuiButton-label';
    this.deleteAction =
      ":nth-child(4) > .MuiListItemText-root > .MuiTypography-root";
    this.deleteModalConfirm = ".MuiDialogActions-root > .MuiButton-contained";
  }

  visit() {
    cy.intercept("https://items.katanamrp.com/api/ProductUis*").as("items");
    cy.visit(Cypress.env("itemsRoute"));
    this.verifyOnItemsPage();
  }

  verifyOnItemsPage() {
    cy.url().should("include", Cypress.env("itemsRoute"));
  }

  expectItem(item) {
    cy.contains(item);
  }

  deleteAllItems() {
    cy.wait("@items").then((r) => {
      if (r.response.body.length) {
        // TODO: it can be done using delete request also
        cy.get(this.itemsCheckbox).as("checkboxes");
        cy.get("@checkboxes").check({ force: true });
        cy.get(this.bundleActions).click({ force: true });
        cy.get(this.deleteAction).click({ force: true });
        cy.get(this.deleteModalConfirm).click({ force: true });
      }
    });
  }
}

export default ItemsPage;
