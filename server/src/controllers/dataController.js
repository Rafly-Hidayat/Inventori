const Barang = require('../models/Barang')

module.exports = {
	getAll: (req, res) => {
		Barang.getAll(req.con, req.query, res)
	},

	getById: (req, res) => {
		Barang.getById(req.con, req.params.id, (err, rows) => {
			if(err) throw err
			rows.length == 0 ? res.send('id barang tidak ditemukan.', 404) : res.json({ data: rows })
		})
	},

	add: (req, res) => {
		Barang.add(req.con, req.body, (err, rows) => {
			if(err){
				return res.send(err.sqlMessage, 400)
			}
			res.send('add new data success.', 200)
		})
	},

	update: (req, res) => {
		Barang.update(req.con, req.body, req.params.id, res, (err, rows) => {
			if(err) throw err
			res.send('success', 200)
		})
	},

	delete: (req, res) => {
		Barang.delete(req.con, req.params.id, res, (err, rows) => {
			if(err) return res.send(err.sqlMessage, 400)
			res.send('success', 200)
		})
	}
}