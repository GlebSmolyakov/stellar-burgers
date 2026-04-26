describe('Бургер конструктор', () => {
  beforeEach(() => {
    cy.openMainPage();
  });

  it('добавление булки', () => {
    cy.addIngredient(1);
    cy.get('[data-cy="constructor"]').should(
      'contain',
      'Краторная булка N-200i'
    );
  });

  it('добавление ингредиента', () => {
    cy.addIngredient(2);
    cy.get('[data-cy="constructor"]').should(
      'contain',
      'Филе Люминесцентного тетраодонтимформа'
    );
  });

  it('добавление соуса', () => {
    cy.addIngredient(3);
    cy.get('[data-cy="constructor"]').should(
      'contain',
      'Соус фирменный Space Sauce'
    );
  });
});
