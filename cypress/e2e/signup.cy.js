import signupPage from '../pages/signupPage'
import signupFactory from '../factories/SignupFactory'

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

        //const deliver = this.deliver.signup

        const deliver = signupFactory.deliver()

        const expectMessage = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.'

        signupPage.fillForm(deliver)
        signupPage.submit()
        signupPage.modalContentShouldBe(expectMessage)
    })

    it('Invalid CPF', function() {

        //const deliver = this.deliver.invalid_user

        const deliver = signupFactory.deliver()

        deliver.cpf = `${deliver.cpf}abc`

        const expectMessage = 'Oops! CPF inválidu'

        signupPage.fillForm(deliver)
        signupPage.submit()
        signupPage.errorMessageContentShouldBe(expectMessage)
    })

    it('Invalid Email', function() {

        //const deliver = this.deliver.invalid_email

        const deliver = signupFactory.deliver()

        deliver.email = deliver.email.replace('@', '.')

        const expectMessage = 'Oops! Email com formato inválido.'

        signupPage.fillForm(deliver)
        signupPage.submit()
        signupPage.errorMessageContentShouldBe(expectMessage)
    })

    it('Required fields - Old', function() {

        signupPage.submit()
        signupPage.errorMessageContentShouldBe('É necessário informar o nome')
        signupPage.errorMessageContentShouldBe('É necessário informar o CPF')
        signupPage.errorMessageContentShouldBe('É necessário informar o email')
        signupPage.errorMessageContentShouldBe('É necessário informar o CEP')
        signupPage.errorMessageContentShouldBe('É necessário informar o número do endereço')
        signupPage.errorMessageContentShouldBe('Selecione o método de entrega')
        signupPage.errorMessageContentShouldBe('Adicione uma foto da sua CNH')
    })

    context('Required fields', function() {

        const messages = [
            {field: 'name', output: 'É necessário informar o nome'},
            {field: 'CPF', output: 'É necessário informar o CPF'},
            {field: 'Email', output: 'É necessário informar o email'},
            {field: 'postalcode', output: 'É necessário informar o CEP'},
            {field: 'number', output: 'É necessário informar o número do endereço'},
            {field: 'deliver_method', output: 'Selecione o método de entrega'},
            {field: 'cnh', output: 'Adicione uma foto da sua CNH'}
        ]

        messages.forEach(function(msg) {
            it(`${msg.field} is required`, function() {
                signupPage.submit()
                signupPage.errorMessageContentShouldBe(msg.output)
            })
        })
    })
})
