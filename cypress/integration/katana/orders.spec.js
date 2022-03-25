/// <reference types="cypress" />

import OrdersPage from "../../pages/orders";
const ordersPage = new OrdersPage();

describe("Orders", () => {
  beforeEach(() => {
    cy.restoreLocalStorage("auth");
  });

  it("Open Orders page", () => {
    ordersPage.visit();
  });
});
