const Pembelian = require('../models/Pembelian')

module.exports = {
    getAll: (req, res) => {
		Pembelian.getAll(req.con, req.query, res)
	},

	getById: (req, res) => {
		Pembelian.getById(req.con, req.params.kd_pembelian, (err, rows) => {
			if(err) throw err
			res.json(rows)
		})
	},

	transaction: (req, res) => {
		Pembelian.transaction(req.con, req.body, res)
	}

}