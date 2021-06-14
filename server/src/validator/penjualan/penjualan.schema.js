const joi = require('joi')

const schema = {
	penjualan: joi.object({
<<<<<<< HEAD
		tgl_penjualan: joi.date().required(),
=======
		tgl_penjualan: joi.date().iso().required(),
>>>>>>> rafly/main
		kd_barang: joi.string().required(),
		dibayar: joi.number().required(),
		quantity: joi.number().required()
	})
}

module.exports = schema