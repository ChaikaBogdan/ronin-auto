/// <reference types="cypress" />

import CustomersPage from "../../pages/customers";
const customersPage = new CustomersPage();

describe("Customers", () => {
  beforeEach(() => {
    cy.restoreLocalStorage("auth");
  });

  it("Open customers page", () => {
    customersPage.visit();
  });
});
