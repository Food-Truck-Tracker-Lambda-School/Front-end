describe('testing form inputs on Registration.js', () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/registration")
    })
    it('meets MVP', () => {
        cy.get('[data-cy=roleId]').select("1").should('have.value', "1")
        cy.get('[data-cy=name]').type("Chad Foodman").should('have.value', 'Chad Foodman')
        cy.get('[data-cy=email]').type('chad@gmail.com').should('have.value', 'chad@gmail.com')
        cy.get('[data-cy=phoneNumber]').type('1231213213').should('have.value', '1231213213')
        cy.get('[data-cy=username]').type('foodManiac').should('have.value', 'foodManiac')
        cy.get('[data-cy=password]').type('foodMonster').should('have.value', 'foodMonster')
        cy.get('[data-cy=terms]').check().should('be.checked')
        cy.get('[data-cy=submit]').click()
    });

})
