describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      username: 'hein',
      name: 'Hein Min Thant',
      password: 'hein522',
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })
  it('front page can be opened', function () {
    cy.contains('blogs')
  })
  it('login button can be clicked', function () {
    cy.contains('Login').click()
  })

  describe('when logged in', function () {
    beforeEach(function () {
      cy.get('input:first').type('hein')
      cy.get('input:last').type('hein522')
      cy.get('#loginBtn').click()
      cy.contains('hein has logged in')
    })

    it('a new blog can be created', function () {
      cy.contains('new blog').click()
      cy.get('#title').type('poggers')
      cy.get('#author').type('tin tin')
      cy.get('#url').type('poggers.com')
      cy.get('#createBtn').click()
      cy.contains('poggers tin tin')
    })
  })
})
