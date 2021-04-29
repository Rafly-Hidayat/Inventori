const perusahaan = require('../models/Perusahaan')

module.exports = {
	getAll: (req, res) => {
		perusahaan.getAll(req.con, req.query, res)
	},
	
	getById: (req, res) => {
		perusahaan.getById(req.con, req.params.id, (err, rows) => {
			if(err) throw err
			rows.length == 0 ? res.send("id tidak ditemukan.", 404) : res.json({ data: rows })
			
		})
	},

	add: (req, res) => {
		perusahaan.add(req.con, req.body, (err, rows) => {
			if(err) throw err
			res.send('add new perusahaan success.', 200)
		})
	},

	update: (req, res) => {
		perusahaan.update(req.con, req.body, req.params.id, res, (err, rows) => {
			if(err) throw err
			res.send('success.', 200)
		})
	},

	delete: (req, res) => {
		perusahaan.delete(req.con, req.params.id, res, (err, rows) => {
			if(err) return res.send(err.sqlMessage, 400)
			res.send('success.', 200)
		})
	}


}