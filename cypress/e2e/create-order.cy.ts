describe('Создание заказа', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' }).as(
      'getUser'
    );
    cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as(
      'createOrder'
    );
    cy.openMainPage();
  });

  afterEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  it('добавляет ингредиенты в конструктор', () => {
    cy.addIngredient(1);
    cy.addIngredient(2);

    cy.get('[data-cy="constructor"]').should(
      'contain',
      'Краторная булка N-200i'
    );
    cy.get('[data-cy="constructor"]').should(
      'contain',
      'Филе Люминесцентного тетраодонтимформа'
    );
  });

  it('перенаправляет на логин при попытке создать заказ без авторизации', () => {
    cy.addIngredient(1);
    cy.createOrder();
    cy.url().should('include', '/login');
    cy.contains('Вход').should('be.visible');
  });

  it('авторизует пользователя и создает заказ', () => {
    cy.addIngredient(1);
    cy.addIngredient(2);

    cy.createOrder();
    cy.login('gleb.smolyakov.05@mail.ru', '123456');
    cy.createOrder();

    cy.contains('12345').should('be.visible');
  });

  it('очищает конструктор после оформления заказа', () => {
    cy.addIngredient(1);
    cy.addIngredient(2);
    cy.addIngredient(3);

    cy.createOrder();
    cy.login('gleb.smolyakov.05@mail.ru', '123456');
    cy.createOrder();

    cy.contains('12345').should('be.visible');
    cy.get('[data-cy="modal-close-button"]').click();

    cy.get('[data-cy="constructor"]').should(
      'not.contain',
      'Краторная булка N-200i'
    );
    cy.get('[data-cy="constructor"]').should(
      'not.contain',
      'Филе Люминесцентного тетраодонтимформа'
    );
    cy.get('[data-cy="constructor"]').should(
      'not.contain',
      'Соус фирменный Space Sauce'
    );
  });
});
