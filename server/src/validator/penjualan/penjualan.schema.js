const joi = require('joi')

const schema = {
	penjualan: joi.object({
		tgl_penjualan: joi.date().required(),
		kd_barang: joi.string().required(),
		dibayar: joi.number().required(),
		quantity: joi.number().required()
	})
}

module.exports = schema