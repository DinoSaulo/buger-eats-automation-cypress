import signupPage from '../pages/signupPage'

describe('Signup', () => {

    beforeEach(() => {
        cy.visit('/')

        cy.get('a[href*="/deliver"]').click()

        cy.url().should('contains', '/deliver')
        cy.get('#page-deliver form h1').should('have.text', 'Cadastre-se para  fazer entregas')

        cy.fixture('deliver').then(function(d) {
            this.deliver = d
        })
    })

    it('User should be deliver', function() {

        const deliver = this.deliver.signup

        const expectMessage = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.'

        signupPage.fillForm(deliver)
        signupPage.submit()
        signupPage.modalContentShouldBe(expectMessage)
    })

    it('Invalid CPF', function() {

        const deliver = this.deliver.invalid_user

        const expectMessage = 'Oops! CPF inválido'

        signupPage.fillForm(deliver)
        signupPage.submit()
        signupPage.errorMessageContentShouldBe(expectMessage)
    })
})
