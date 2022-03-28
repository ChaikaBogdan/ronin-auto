const { faker } = require("@faker-js/faker");

class SalesOrder {
  constructor() {
    this.status = ".jss44";
    this.customerInput = '[placeholder="Search or create customer"]';
    this.createNewCustomerConfirm = "[id^=mui-][id$=-option-0]";
    this.itemInput = ".gridCellHintText";
    this.itemCell = 'input[id^="mui-"][type="text"]';
    this.billingAdress = '[data-testid="address-field-new"]';
    this.billingFirstName =
      ".MuiGrid-spacing-xs-6 > :nth-child(1) > :nth-child(1) > .MuiInputBase-root > .MuiInputBase-input";
    this.billingLastName =
      ".MuiGrid-spacing-xs-6 > :nth-child(1) > :nth-child(2) > .MuiInputBase-root > .MuiInputBase-input";
    this.billingCompanyName =
      ".MuiGrid-spacing-xs-6 > :nth-child(1) > :nth-child(3) > .MuiInputBase-root > .MuiInputBase-input";
    this.billingPhone =
      ":nth-child(4) > .MuiInputBase-root > .MuiInputBase-input";
    this.billingAdressSubmit = "#submitButton > .MuiButton-label";
    this.itemUnits =
      ".quickAddItemUom > .MuiInputBase-root > .MuiInputBase-input";
    this.createNewItemConfirm = ".jss47";
    this.uomInput =
      ".quickAddItemUom > .MuiInputBase-root > .MuiInputBase-input";
    this.saveItemButton =
      ".MuiDialogActions-root > .MuiButton-contained > .MuiButton-label";

    this.adress = '[data-testid="address-field-name"]';
    this.adressInput =
      '[role="combobox"] > .MuiInputBase-root > .MuiInputBase-input';
    this.zip =
      ":nth-child(4) > .MuiGrid-container > :nth-child(2) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input";
  }

  visit() {
    cy.visit(Cypress.env("salesOrderRoute"));
    this.verifyOnSalesOrdersPage();
  }

  verifyOnSalesOrdersPage() {
    cy.url().should("include", Cypress.env("salesOrderRoute"));
  }

  setupOrderSavedIntercept() {
    cy.intercept("https://sales.katanamrp.com/api/salesOrders").as(
      "orderSaved"
    );
  }

  addNewSalesOrder(fistName, lastName, item) {
    this.setupOrderSavedIntercept();
    cy.get(this.customerInput).type(`${fistName} ${lastName}`);
    cy.get(this.createNewCustomerConfirm).click();
    cy.wait("@orderSaved");
    cy.get(this.billingAdress).click({ force: true });
    cy.get(this.billingFirstName).type(fistName);
    cy.get(this.billingLastName).type(lastName);
    cy.get(this.billingCompanyName).type(faker.company.companyName());
    cy.get(this.billingPhone).type(faker.phone.phoneNumber("###-###-###"));
    cy.get(this.billingAdressSubmit).click();
    cy.get(this.itemInput).click();
    cy.get(this.itemCell).first().type(item);
    cy.get(this.createNewItemConfirm).click();
    cy.get(this.uomInput).type("cm{enter}");
    cy.get(this.saveItemButton).click();
    cy.get(this.status).click({ force: true });
    this.verifyOrderSavedStatus();
  }

  editAddress(address, zip) {
    cy.get(this.adress).click({ force: true });
    cy.get(this.adressInput).click();
    cy.intercept("**/api/sales-order-address/*").as("addressSaved");
    cy.intercept(
      "https://maps.googleapis.com/maps/api/place/js/AutocompletionService.GetPredictionsJson*"
    ).as("autocomplete");
    cy.get(this.adressInput).type(`${address}`);
    cy.wait("@autocomplete").then(() => {
      // TODO: superflaky autocomplete
      cy.wait(1000);
      cy.get(this.adressInput).type(`{enter}`);
      cy.get(this.zip).should("have.value", zip);
      cy.get("#submitButton").click();
      cy.wait("@addressSaved");
    });
  }

  verifyOrderSavedStatus() {
    cy.get(this.status).should("have.text", "All changes saved");
  }

  setupOrderInfoIntercept() {
    cy.intercept("**/salesOrders/*/info").as("info");
  }
  verifyBillingAdresAPI(address) {
    cy.wait("@info").then((r) => {
      expect(r.response.body.addresses[0].line1).to.eq(address);
    });
  }
}

export default SalesOrder;
