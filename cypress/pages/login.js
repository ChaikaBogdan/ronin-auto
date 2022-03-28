import SalesPage from "./sales";

class LoginPage {
  constructor() {
    this.emailInput = 'input[name="email"]';
    this.passwordInput = 'input[name="password"]';
    this.signInButton = ".auth0-lock-submit";
  }

  visit() {
    cy.visit(Cypress.env("loginRoute"));
    this.veryfyOnLoginPage();
  }

  veryfyOnLoginPage() {
    cy.url().should("include", Cypress.env("loginRoute"));
  }

  signIn(email, password) {
    this.visit();
    this.veryfyOnLoginPage();
    cy.get(this.emailInput).clear().type(email);
    cy.get(this.passwordInput).clear().type(password);
    cy.get(this.signInButton).click();
    return new SalesPage();
  }

  auth(email, password) {
    const salesPage = this.signIn(email, password);
    salesPage.interceptSalesOrderOpenLists();
    salesPage.waitForOrders();
    // TODO: it can be done using token from redirect also
    cy.saveLocalStorage("auth");
    return salesPage;
  }
}

export default LoginPage;
