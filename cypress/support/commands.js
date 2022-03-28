// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import "cypress-localstorage-commands";
import LoginPage from "../pages/login";
const loginPage = new LoginPage();
import SalesPage from "../pages/sales";
const salesPage = new SalesPage();
import ItemsPage from "../pages/items";
const itemsPage = new ItemsPage();
import ContactsCustomersPage from "../pages/contactsCustomers";
const contactsCustomersPage = new ContactsCustomersPage();

Cypress.Commands.add("beforeAllSpecs", () => {
  cy.fixture("user").then((user) => {
    // TODO: it can be done much better with pre-seed of test user
    loginPage.auth(user.email, user.password);
    salesPage.visit();
    salesPage.deleteAllSales();
    itemsPage.visit();
    itemsPage.deleteAllItems();
    contactsCustomersPage.visit();
    contactsCustomersPage.deleteAllCustomers();
  });
});
