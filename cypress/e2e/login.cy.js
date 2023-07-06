/// <reference types="cypress" />

//to Create Variable for username and password
var username = Cypress.env('username')
var password = Cypress.env('password')

//Custom Command for Login through the website
Cypress.Commands.add('LoginApps', () => {
    cy.visit('www.themoviedb.org/login')
    cy.url().should('include', '/login')
    cy.get('[for="username"]').type(username)
    cy.get('[for="password"]').type(password)
    cy.get('[id="login_button"]').click()

})

//Start of testing
describe('Testing Mark as Favourite Feature', () => {
    
    //case 00: User can login
    //before executing each case, we need to make sure that user can login using their username and password
    it('User can Login to their account', () => {
        cy.LoginApps()
        cy.url().should('contain', '/u/' + username)
    })

    //case 1a: User cannot Mark as Favorite a movie before Logging in into moviedb
    it('User cannot Mark as Favourite Movie before Login', () => {
        cy.visit('www.themoviedb.org/movie')
        cy.get('[class = "card style_1"]').first().click()
        .then((resp) => {
            expect(resp.status).to.not.eq(200)
        })
        
    })

    //case 1b: After click mark favourite movie, movie will be saved on "favourite" area on profile
    it('User can Add favourite movie', () => {
        cy.LoginApps()
        cy.visit('www.themoviedb.org/movie')
        cy.get('[class = "card style_1"]').first().click()
        
        cy.get('h2[class="21"]').find('a')
        .then(($text) => {
                const text = $text.text()

        cy.get('ul').should('have.class', 'auto actions')
        cy.get('a[class="no_click add_to_account_list favourite"]').dblclick()
        cy.visit('www.themoviedb.org/u/'+username+'/favorites')
        cy.get('div[class="title"]').find('h2').first().should(($text2) => {
            expect($text2.text()).to.eq(text)
        })
    })

        
    })

    //case 1d: User can remove favourite movie and will be reflected on Profile 
    it('User can Remove favourite Movie',() => {
        cy.LoginApps()
        cy.visit('www.themoviedb.org/movie')
        cy.get('[class = "card style_1"]').first().click()
        
        cy.get('h2[class="21"]').find('a')
        .then(($text) => {
                const text = $text.text()

        cy.get('ul').should('have.class', 'auto actions')
        cy.get('a[class="no_click add_to_account_list favourite"]')
        .wait(500)
        .click()
        cy.visit('www.themoviedb.org/u/'+username+'/favorites')
        cy.get('div[class="title"]').find('h2').first().should(($text2) => {
            expect($text2.text()).to.not.eq(text)
    })
})


})
    //case 1c: user can add more than 1 favourite Movie
    it('User can Add more than 1 favourite Movie', () => {
        cy.LoginApps()
        cy.visit('www.themoviedb.org/movie')
        cy.get('[class = "card style_1"]').eq(4).click()
       
        cy.get('h2[class="20"]').find('a')
        .then(($text) => {
                const text = $text.text()
        cy.get('ul').should('have.class', 'auto actions')
        cy.get('a[class="no_click add_to_account_list favourite"]').click()
        cy.wait(1000)
        cy.visit('www.themoviedb.org/movie')
        cy.get('[class = "card style_1"]').eq(3).click()
        cy.get('h2[class="35"]').find('a')
        .then(($text3) => {
                const text2 = $text3.text()

        cy.get('ul').should('have.class', 'auto actions')
        cy.get('a[class="no_click add_to_account_list favourite"]')
        .wait(500)
        .click()
        cy.visit('www.themoviedb.org/u/'+username+'/favorites')
        cy.get('div[class="title"]').find('h2').first().should(($text2) => {
            expect($text2.text()).to.eq(text2)
             })
        cy.get('div[class="title"]').find('h2').eq(1).should(($text4) => {
            expect($text4.text()).to.eq(text)
            })

        })

        })

    })

    //case 1e: User can sort their Favourite Movie 
    it('User can Sort Favourite Movie', () => {
        cy.LoginApps()
        cy.visit('www.themoviedb.org/u/' + username +'/favorites')
        cy.get('div[class="title"]').find('h2').first()
        .then(($text_1) => {
            const first = $text_1.text
            cy.get('div[class="title"]').find('h2').eq(1)
            .then(($text_2) => {
            const second = $text_2.text
        cy.get('a[class="sort_order selected color_hover silver no_click"]').find('span').click()
        cy.wait(1000)
        cy.get('div[class="title"]').find('h2').first().should(($text_after_1) => {
            expect($text_after_1.text()).to.not.eq(first)
             }) 
        cy.get('div[class="title"]').find('h2').eq(1).should(($text_after_2) => {
                expect($text_after_2.text()).to.not.eq(second)
                 }) 
        
        })    

             })
    })
})
