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
    this.preserveLocalStorage();
    return new SalesPage();
  }

  preserveLocalStorage() {
    cy.wait(5000);
    cy.saveLocalStorage("auth");
  }
}

export default LoginPage;
