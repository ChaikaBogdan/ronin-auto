/// <reference types="cypress" />

import ContactsCustomersPage from "../../pages/contactsCustomers";
const contactsCustomersPage = new ContactsCustomersPage();
import CustomerPage from "../../pages/customer";
const customerPage = new CustomerPage();
import SalesPage from "../../pages/sales";
const salesPage = new SalesPage();
const { faker } = require("@faker-js/faker");

describe("Customers", () => {
  beforeEach(() => {
    cy.restoreLocalStorage("auth");
  });

  it("Open Contacts Customers page", () => {
    contactsCustomersPage.visit();
  });

  it("Open new customer page from navbar", () => {
    salesPage.visit();
    const customerPage = salesPage.navbar.newCustomer();
    customerPage.verifyOnCustomerPage();
  });

  it("Adding new customer", () => {
    customerPage.visit();
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const email = faker.internet.email();
    customerPage.addNewCustomer(firstName, lastName, email);
    contactsCustomersPage.visit();
    contactsCustomersPage.expectCustomer(email);
  });
});
