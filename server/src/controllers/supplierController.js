const Supplier = require('../models/Supplier')

module.exports = {
	getAll: (req, res) => {
		Supplier.getAll(req.con, req.query, res)
	},
	
	getById: (req, res) => {
		Supplier.getById(req.con, req.params.id, (err, rows) => {
			if(err) throw err
			rows.length == 0 ? res.send("id tidak ditemukan.", 404) : res.json({ data: rows })
			
		})
	},

	add: (req, res) => {
		Supplier.add(req.con, req.body, (err, rows) => {
			if(err) throw err
			res.send('add new supplier success.', 201)
		})
	},

	update: (req, res) => {
		Supplier.update(req.con, req.body, req.params.id, res, (err, rows) => {
			if(err) throw err
			res.send('success.', 200)
		})
	},

	delete: (req, res) => {
		Supplier.delete(req.con, req.params.id, res, (err, rows) => {
			if(err) return res.send(err.sqlMessage, 400)
			res.send('success.', 200)
		})
	}


}