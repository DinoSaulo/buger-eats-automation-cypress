class SignupPage {

    fillForm(deliver){
        cy.get('input[name="name"]').type(deliver.name)
        cy.get('input[name="cpf"]').type(deliver.cpf)
        cy.get('input[name="email"]').type(deliver.email)
        cy.get('input[name="whatsapp"]').type(deliver.whatsapp)

        cy.get('input[name="postalcode"]').type(deliver.address.cep)
        cy.get('input[type=button][value="Buscar CEP"]').click()

        cy.get('input[name="address-number"]').type(deliver.address.number)
        cy.get('input[name="address-details"]').type(deliver.address.details)

        // address assertions
        cy.get('input[name="address"]').should('have.value', deliver.address.street)
        cy.get('input[name="district"]').should('have.value', deliver.address.district)
        cy.get('input[name="city-uf"]').should('have.value', deliver.address.city_state)

        cy.contains('.delivery-method li', deliver.deliver_method).click()

        cy.get('input[accept^="image"]').attachFile(deliver.cnh)
    }

    submit(){
        cy.get('form button[type=submit]').click()
    }

    modalContentShouldBe(expectMessage){
        cy.get('.swal2-container .swal2-html-container').should('have.text', expectMessage)
    }

    errorMessageContentShouldBe(expectMessage){
        cy.get('.alert-error').should('have.text', expectMessage)
    }
}

export default new SignupPage;