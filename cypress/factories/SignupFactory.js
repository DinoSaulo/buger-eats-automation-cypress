var faker = require('faker')
var cpf = require('gerador-validador-cpf')

export default {

    deliver: function() {

        const firstName = faker.name.firstName()
        const lastName = faker.name.lastName()

        let data = {
            name: `${firstName} ${lastName}`,
            cpf: cpf.generate(),
            email: faker.internet.email(firstName),
            whatsapp: 1140028922,
            address: {
                cep: "50030230",
                street: "Cais do Apolo",
                number: "1234",
                details: "Sem complemento",
                district: "Recife",
                city_state: "Recife/PE"
            },
            deliver_method: "Moto",
            cnh: "../../images/cnh-digital.jpg"
        }

        return data
    }
}