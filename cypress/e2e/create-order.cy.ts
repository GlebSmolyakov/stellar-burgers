describe('Создание заказа', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');

    cy.intercept('GET', 'api/auth/user', {
      fixture: 'user.json'
    }).as('getUser');

    cy.intercept('POST', 'api/orders', {
      fixture: 'order.json'
    }).as('createOrder');

    cy.visit('/');
    cy.wait('@getIngredients');
  });

  it('добавляет ингредиенты в конструктор', () => {
    cy.get('[data-cy="ingredient-1"]').contains('button', 'Добавить').click();
    cy.get('[data-cy="ingredient-2"]').contains('button', 'Добавить').click();

    cy.get('[data-cy="constructor"]')
      .should('contain', 'Краторная булка N-200i')
      .should('contain', 'Филе Люминесцентного тетраодонтимформа');
  });

  it('перенаправляет на логин при попытке создать заказ без авторизации', () => {
    cy.get('[data-cy="ingredient-1"]').contains('button', 'Добавить').click();

    cy.contains('button', 'Оформить заказ').click();

    cy.url().should('include', '/login');
    cy.contains('Вход').should('be.visible');
  });

  it('авторизует пользователя и создает заказ', () => {
    cy.get('[data-cy="ingredient-1"]').contains('button', 'Добавить').click();
    cy.get('[data-cy="ingredient-2"]').contains('button', 'Добавить').click();

    cy.contains('button', 'Оформить заказ').click();

    cy.get('input[type="email"]').type('gleb.smolyakov.05@mail.ru');
    cy.get('input[type="password"]').type('123456');
    cy.contains('button', 'Войти').click();

    cy.contains('button', 'Оформить заказ').click();

    cy.contains('12345').should('be.visible');
  });
});
