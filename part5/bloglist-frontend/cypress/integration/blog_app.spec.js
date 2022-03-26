describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    let user = {
      username: 'hein',
      name: 'Hein Min Thant',
      password: 'hein522',
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    user = {
      username: 'poggers',
      name: 'Dynamo',
      password: 'poggers5000',
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('Login')
  })

  //   describe('Login', function () {
  //     it('succeeds with correct credentials', function () {
  //       cy.get('input:first').type('hein')
  //       cy.get('input:last').type('hein522')
  //       cy.get('#loginBtn').click()
  //       cy.contains('hein has logged in')
  //     })

  //     it('fails with wrong credentials', function () {
  //       cy.get('input:first').type('hein')
  //       cy.get('input:last').type('heid2')
  //       cy.get('#loginBtn').click()
  //       cy.get('#notiMessage').should('have.css', 'color', 'rgb(255, 0, 0)')
  //     })
  //   })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'hein', password: 'hein522' })
    })

    // it('A blog can be created', function () {
    //   cy.contains('new blog').click()
    //   cy.get('#title').type('poggers')
    //   cy.get('#author').type('poggerion')
    //   cy.get('#url').type('poggers.com')

    //   cy.get('#createBtn').click()
    //   cy.contains('poggers poggerion')
    // })

    // it('A blog can be liked', function () {
    //   cy.createBlog({ title: 'tin tin', url: 'tintin.com', author: 'poggers' })
    //   cy.contains('view').click()
    //   cy.contains('like').click()
    //   cy.contains('likes 1')
    // })

    // it('A blog can be deleted by the user', function () {
    //   cy.createBlog({ title: 'tin tin', url: 'tintin.com', author: 'poggers' })
    //   cy.contains('view').click()
    //   cy.contains('delete').click()
    //   cy.contains('tin tin poggers').should('not.exist')
    // })

    // it('A blog cannot be deleted by other user', function () {
    //   cy.createBlog({ title: 'tin tin', url: 'tintin.com', author: 'poggers' })
    //   cy.logout()
    //   cy.login({ username: 'poggers', password: 'poggers5000' })
    //   cy.contains('view').click()
    //   cy.contains('delete').should('not.exist')
    // })

    it('blogs are ordered by likes', function () {
      cy.createBlog({ title: 'tin tin', url: 'tintin.com', author: 'poggers' })
      cy.createBlog({
        title: 'jimyy',
        url: 'seinfeild.com',
        author: 'simarilion',
      })
      cy.contains('jimyy simarilion').contains('view').click()
      cy.contains('like').click()
      cy.get('.blog').should(($blogs) => {
        expect($blogs).to.have.length(2)
        expect($blogs.eq(0)).to.contain('jimyy simarilio')
        expect($blogs.eq(1)).to.contain('tin tin poggers')
      })
    })
  })
})
