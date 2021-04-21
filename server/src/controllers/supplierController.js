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
	}
}