declare namespace Cypress {
  interface Chainable {
    openMainPage(): Chainable<void>;
    addIngredient(index: number): Chainable<void>;
    login(email: string, password: string): Chainable<void>;
    createOrder(): Chainable<void>;
  }
}
