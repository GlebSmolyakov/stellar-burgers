describe('Модальное окно ингредиента', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');

    cy.visit('/');
    cy.wait('@getIngredients');
  });

  it('открытие модального окна', () => {
    cy.get('[data-cy="ingredient-1"]').click();
    cy.contains('Краторная булка N-200i').should('be.visible');
  });

  it('закрытие модального окна', () => {
    cy.get('[data-cy="ingredient-1"]').click();
    cy.get('[data-cy="modal-close-button"]').click();

    cy.url().should('eq', 'http://localhost:4000/');
  });
});
