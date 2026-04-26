describe('Модальное окно ингредиента', () => {
  beforeEach(() => {
    cy.openMainPage();
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

  it('закрытие модального окна клавишей Esc', () => {
    cy.get('[data-cy="ingredient-1"]').click();
    cy.get('body').type('{esc}');
    cy.get('[data-cy="modal"]').should('not.exist');
  });
});
