const Penjualan = require('../models/Penjualan')

module.exports = {
	getAll: (req, res) => {
		Penjualan.getAll(req.con, req.query, res)
	},

	getById: (req, res) => {
		Penjualan.getById(req.con, req.params.kd_penjualan, (err, rows) => {
			if(err) throw err
			rows.length == 0 ? res.send("id tidak ditemukan.", 404) : res.json({ data: rows })
		})
	},

	transaction: (req, res) => {
		Penjualan.transaction(req.con, req.body, res, (err, rows) => {
			if(err) throw err
		})
	}
}