const joi = require("joi")

const schema = {
    admin: joi.object({
       nama: joi.string().required(),
       email: joi.string().email().required(),
       password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
    })
}

module.exports = schema