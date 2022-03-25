/// <reference types="cypress" />
import CustomersPage from "../../pages/customers";
import LoginPage from "../../pages/login";

const loginPage = new LoginPage();
const customersPage = new CustomersPage();

describe("Customer Creation", () => {
  beforeEach(() => {
    cy.restoreLocalStorage("auth");
  });

  before(() => {
    cy.fixture("user").then((user) => {
      loginPage.signIn(user.email, user.password);
    });
  });

  it("test1", () => {
    customersPage.visit();
  });
});
