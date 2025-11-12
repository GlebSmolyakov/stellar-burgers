describe('бургер конструктор', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');

    cy.visit('/');
    cy.wait('@getIngredients');
  });

  it('добавление булки в конструктор', () => {
    cy.get('[data-cy="ingredient-1"]').contains('button', 'Добавить').click();

    cy.get('[data-cy="constructor"]').should(
      'contain',
      'Краторная булка N-200i'
    );
  });

  it('добавление ингредиента в конструктор', () => {
    cy.get('[data-cy="ingredient-2"]').contains('button', 'Добавить').click();

    cy.get('[data-cy="constructor"]').should(
      'contain',
      'Филе Люминесцентного тетраодонтимформа'
    );
  });

  it('добавление соуса в конструктор', () => {
    cy.get('[data-cy="ingredient-3"]').contains('button', 'Добавить').click();

    cy.get('[data-cy="constructor"]').should(
      'contain',
      'Соус фирменный Space Sauce'
    );
  });
});
