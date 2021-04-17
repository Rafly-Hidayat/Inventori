const Barang = require('../models/Barang')

module.exports = {
	getAll: (req, res) => {
		Barang.getAll(req.con, (err, rows) => {
			if(err) throw err
			res.json({ data: rows })
		})
	}
}