const Pembelian = require('../models/Pembelian')

module.exports = {
    getAll: (req, res) => {
		Pembelian.getAll(req.con, req.query, res)
	},
}