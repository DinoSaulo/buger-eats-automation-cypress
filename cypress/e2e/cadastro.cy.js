describe('Cadastro', () => {
    it('Usuário deve se tornar um entregador', () => {
        cy.viewport(1920, 1080)
        cy.visit('https://buger-eats.vercel.app')

        cy.get('a[href*="/deliver"]').click()

        cy.url().should('contains', '/deliver')
        cy.get('#page-deliver form h1').should('have.text', 'Cadastre-se para  fazer entregas')

        var entregador = {
            nome: 'Saulo Barros',
            cpf: '00000014141',
            email: 'saulo@email.com',
            whatsapp: 1140028922,
            endereco: {
                cep: '50030230',
                rua: 'Cais do Apolo',
                numero: '1234',
                complemento: 'Sem complemento',
                bairro: 'Recife',
                cidade_uf: 'Recife/PE'
            },
            metodo_entrega: 'Moto',
            cnh: '../../images/cnh-digital.jpg'
        }

        cy.get('input[name="name"]').type(entregador.nome)
        cy.get('input[name="cpf"]').type(entregador.cpf)
        cy.get('input[name="email"]').type(entregador.email)
        cy.get('input[name="whatsapp"]').type(entregador.whatsapp)

        cy.get('input[name="postalcode"]').type(entregador.endereco.cep)
        cy.get('input[type=button][value="Buscar CEP"]').click()

        cy.get('input[name="address-number"]').type(entregador.endereco.numero)
        cy.get('input[name="address-details"]').type(entregador.endereco.complemento)

        // address assertions
        cy.get('input[name="address"]').should('have.value', entregador.endereco.rua)
        cy.get('input[name="district"]').should('have.value', entregador.endereco.bairro)
        cy.get('input[name="city-uf"]').should('have.value', entregador.endereco.cidade_uf)

        cy.contains('.delivery-method li', entregador.metodo_entrega).click()

        cy.get('input[accept^="image"]').attachFile(entregador.cnh)

        cy.get('form button[type=submit]').click()
    })
})