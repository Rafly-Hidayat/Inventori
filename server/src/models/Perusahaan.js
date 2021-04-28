const mysql = require('mysql')

module.exports = {
	getAll: (con, callback) => {
		const query = "SELECT * FROM perusahaan"
		con.query(query, callback)
	},
	
	getById: (con, id, callback) => {
		const query = `SELECT * FROM perusahaan WHERE kd_perusahaan = ${id}`
		con.query(query, callback)
	},

	add: (con, data, callback) => {
		const query = `INSERT INTO perusahaan SET
						nama_perusahaan = '${data.nama_perusahaan}',
						alamat = '${data.alamat}',
						pemilik = '${data.pemilik}',
						kota = '${data.kota}'`
		con.query(query, callback)
	},
	
	update: (con, data, id, res, callback) => {	
		con.query(`SELECT * FROM perusahaan WHERE kd_perusahaan = ${id}`, (err, rows) => {
			if(err) throw err
			if(rows == 0) return res.send('id perusahaan tidak ditemukan.', 404)
			const query = `UPDATE perusahaan SET
					nama_perusahaan = '${data.nama_perusahaan}',
					alamat = '${data.alamat}',
                    pemilik = '${data.pemilik}',
                    kota = '${data.kota}'
					WHERE kd_perusahaan = ${id}`
			con.query(query, callback)
		})
	},

	delete: (con, id, res, callback) => {
		con.query(`SELECT * FROM perusahaan WHERE kd_perusahaan = ${id}`, (err, rows) => {
			if(err) throw err
			if(rows == 0) return res.send('id perusahaan tidak ditemukan.', 404)
			const query = `DELETE FROM perusahaan WHERE kd_perusahaan = ${id}`
			con.query(query, callback)
		})
	}

}