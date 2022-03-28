/// <reference types="cypress" />

import SalesOrder from "../../pages/salesOrder";
const salesOrderPage = new SalesOrder();
import SalesPage from "../../pages/sales";
const salesPage = new SalesPage();
const { faker } = require("@faker-js/faker");

describe("Sales Orders", () => {
  beforeEach(() => {
    cy.restoreLocalStorage("auth");
  });

  it("Open Orders page", () => {
    salesOrderPage.visit();
  });

  it("Open Orders page from navbar", () => {
    salesPage.visit();
    const salesOrderPage = salesPage.navbar.newSalesOrder();
    salesOrderPage.verifyOnSalesOrdersPage();
  });

  it("Adding new order", () => {
    const itemName = faker.lorem.word();
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    salesOrderPage.visit();
    salesOrderPage.addNewSalesOrder(firstName, lastName, itemName);
    salesPage.visit();
    salesPage.expectOrder(firstName, lastName);
  });

  it("Edit customer adress on Order", () => {
    const itemName = faker.random.alphaNumeric(10);
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    salesOrderPage.visit();
    salesOrderPage.addNewSalesOrder(firstName, lastName, itemName);
    salesPage.visit();
    salesPage.expectOrder(firstName, lastName);
    const orderPage = salesPage.inspectOrder(firstName, lastName);
    orderPage.editAddress("Kai 1", 10111);
    orderPage.setupOrderInfoIntercept();
    cy.reload();
    orderPage.verifyBillingAdresAPI("1 Kai");
  });
});
