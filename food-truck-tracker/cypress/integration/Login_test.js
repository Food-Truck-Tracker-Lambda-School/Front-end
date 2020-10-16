describe('testing form inputs on Login.js', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/login')
    })
    it('meets mvp', () => {
        cy.get('[data-cy=username]').type('foodManiac').should('have.value', 'foodManiac')
        cy.get('[data-cy=password]').type('foodMonster').should('have.value', 'foodMonster')
        cy.get('[data-cy=submit]').click()
    });
});
