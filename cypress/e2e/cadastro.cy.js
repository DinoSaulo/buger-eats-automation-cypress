import SignupPage from '../pages/signupPage'

describe('Cadastro', () => {

    beforeEach(() => {
        cy.viewport(1920, 1080)
        cy.visit('https://buger-eats.vercel.app')

        cy.get('a[href*="/deliver"]').click()

        cy.url().should('contains', '/deliver')
        cy.get('#page-deliver form h1').should('have.text', 'Cadastre-se para  fazer entregas')
    })

    it('Usuário deve se tornar um deliver', () => {

        var deliver = {
            name: 'Saulo Barros',
            cpf: '00000014141',
            email: 'saulo@email.com',
            whatsapp: 1140028922,
            address: {
                cep: '50030230',
                street: 'Cais do Apolo',
                number: '1234',
                details: 'Sem complemento',
                district: 'Recife',
                city_state: 'Recife/PE'
            },
            deliver_method: 'Moto',
            cnh: '../../images/cnh-digital.jpg'
        }

        const expectMessage = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.'

        var signupPage = new SignupPage()

        signupPage.fillForm(deliver)
        signupPage.submit()
        signupPage.modalContentShouldBe(expectMessage)

    })

    it('CPF incorreto', () => {

        var deliver = {
            name: 'Saulo Barros',
            cpf: '00000000000',
            email: 'saulo@email.com',
            whatsapp: 1140028922,
            address: {
                cep: '50030230',
                street: 'Cais do Apolo',
                number: '1234',
                details: 'Sem complemento',
                district: 'Recife',
                city_state: 'Recife/PE'
            },
            deliver_method: 'Moto',
            cnh: '../../images/cnh-digital.jpg'
        }

        const expectMessage = 'Oops! CPF inválido'

        var signupPage = new SignupPage()

        signupPage.fillForm(deliver)
        signupPage.submit()
        signupPage.errorMessageContentShouldBe(expectMessage)

    })
})
