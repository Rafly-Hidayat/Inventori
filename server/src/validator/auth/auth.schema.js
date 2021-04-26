const joi = require('joi')

const schema = {
    login: joi.object({
        email: joi.string().email().required(),
        password: joi.string().required()
    })
}

module.exports = schema