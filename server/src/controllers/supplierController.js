const Supplier = require('../models/Supplier')

module.exports = {
	getAll: (req, res) => {
		Supplier.getAll(req.con, (err, rows) => {
			if(err) throw err
			res.json({ data: rows })
		})
	},

	add: (req, res) => {
		Supplier.add(req.con, req.body, (err, rows) => {
			if(err) throw err
			res.send('add new supplier success.', 200)
		})
	},

	update: (req, res) => {
		Supplier.update(req.con, req.body, req.params.id, (err, rows) => {
			if(err) throw err
			res.send('success.', 200)
		})
	}

}