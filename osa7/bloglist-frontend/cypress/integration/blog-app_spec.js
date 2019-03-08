describe('Note ', function() {

  beforeEach(function() {
    cy.visit('http://localhost:3000')
  })

  it('front page is displayed', function() {
    cy.contains('Blog App')
  })

  it('can log in', function() {
    cy.get('#username')
      .type('freddym')
    cy.get('#password')
      .type('thequeen')
    cy.get('#login')
      .click()
    cy.contains('Logged in')
  })

})