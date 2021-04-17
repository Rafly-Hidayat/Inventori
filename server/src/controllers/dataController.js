const Barang = require('../models/Barang')

module.exports = {
	getAll: (req, res) => {
		Barang.getAll(req.con, (err, rows) => {
			if(err) throw err
			res.json({ data: rows })
		})
	},

	add: (req, res) => {
		Barang.add(req.con, req.body, (err, rows) => {
			if(err){
				res.send(err.sqlMessage, 400)
			}
			res.send('add new data success.', 200)
		})
	}
}