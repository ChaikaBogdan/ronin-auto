const { faker } = require("@faker-js/faker");
class CustomerPage {
  constructor() {
    this.displayNameInput = '[data-testid="inputCustomerDisplayName"]';
    this.emailInput = '[data-testid="inputCustomerEmail"]';
    this.firstNameInput =
      '[data-testid="inputCustomerFirstName"] > .MuiInputBase-root > .MuiInputBase-input';
    this.lastNameInput = '[data-testid="inputCustomerLastName"]';
    this.companyNameInput = '[data-testid="inputCustomerCompany"]';
    this.phoneInput = '[data-testid="inputCustomerPhone"]';
    this.commentInput = '[data-testid="inputCustomerComment"]';
    this.billingAddressInput =
      '[data-testid="inputCustomerDefaultBillingAddress"]';
    this.shippingAddressInput =
      '[data-testid="inputCustomerDefaultShippingAddress"]';
    this.status = ".jss35";
  }

  visit() {
    this.interceptCustomers();
    cy.visit(Cypress.env("customerRoute"));
    this.verifyOnCustomerPage();
  }

  interceptCustomers() {
    cy.intercept(Cypress.env("customersAPI")).as("customers");
  }

  verifyOnCustomerPage() {
    cy.url().should("include", Cypress.env("customerRoute"));
  }

  addNewCustomer(firstName, lastName, email) {
    cy.get(this.displayNameInput).type(`${firstName} ${lastName}`);
    cy.get(this.emailInput).type(email);
    cy.get(this.phoneInput).type(faker.phone.phoneNumber("###-###-###"), {
      delay: 100,
    });
    cy.get(this.companyNameInput).type(faker.company.companyName());
    cy.get(this.status).click({ force: true });
    this.verifyCustomerSavedStatus();
  }

  waitForCustomerSave() {
    cy.wait("@customers").its("response.statusCode").should("eq", 200);
  }

  verifyCustomerSavedStatus() {
    cy.get(this.status).should("have.text", "All changes saved");
  }

  verifyCustomerSaved(firstName, lastName) {
    cy.get("@customers").then((customers) => {
      expect(customers.response.status).to.eq(200);
      expect(customers.response.body).to.have.property("firstName", firstName);
      expect(customers.response.body).to.have.property("lastName", lastName);
    });
  }
}

export default CustomerPage;
