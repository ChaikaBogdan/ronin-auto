import CustomerPage from "./customer";
import SalesOrderPage from "./salesOrder";
class Navbar {
  constructor() {
    this.plusButton = "#globalAdd";
    this.newCustomerButton = "#add-customer";
    this.newSalesOrderButton = "#add-sales";
  }

  newCustomer() {
    cy.get(this.plusButton).click();
    cy.get(this.newCustomerButton).click();
    return new CustomerPage();
  }

  newSalesOrder() {
    cy.get(this.plusButton).click();
    cy.get(this.newSalesOrderButton).click();
    return new SalesOrderPage();
  }
}

export default Navbar;
