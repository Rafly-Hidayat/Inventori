const joi = require('joi')

const schema = {
	penjualan: joi.object({
		kd_penjualan: joi.string().required(),
		kd_barang: joi.string().required(),
		quantity: joi.number().required()
	})
}

module.exports = schema