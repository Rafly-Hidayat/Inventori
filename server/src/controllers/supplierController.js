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
		Supplier.update(req.con, req.body, req.params.kd_supplier, (err, rows) => {
			if(err) throw err
			res.send('update supplier success.', 200)
		})
	},

	delete: (req, res) => {
		Supplier.delete(req.con, req.params.kd_supplier, (err, rows) => {
			if(err) throw err
			res.send('delete supplier success.', 200)
		})
	}
}