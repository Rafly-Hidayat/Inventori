const mysql = require('mysql')

module.exports = {
	getAll: (con, callback) => {
		const query = "SELECT * FROM supplier"
		con.query(query, callback)
	},

	add: (con, data, callback) => {
		const query = `INSERT INTO supplier SET
						nama_supplier = '${data.nama_supplier}',
						alamat = '${data.alamat}'`
		con.query(query, callback)
	},
	
	update: (con, data, id, res, callback) => {	
		con.query(`SELECT * FROM supplier WHERE kd_supplier = ${id}`, (e, rows) => {
			if(e) throw e
			if(rows == 0) return res.send('id supplier tidak ditemukan.', 404)	
			const query = `UPDATE supplier SET
					nama_supplier = '${data.nama_supplier}',
					alamat = '${data.alamat}'
					WHERE kd_supplier = ${id}`
			con.query(query, callback)
		})
	},

	delete: (con, id, res, callback) => {
		con.query(`SELECT * FROM supplier WHERE kd_supplier = ${id}`, (e, rows) => {
			if(e) throw e
			if(rows == 0) return res.send('id supplier tidak ditemukan.', 404)
			const query = `DELETE FROM supplier WHERE kd_supplier = ${id}`
			con.query(query, callback)
		})
	}

}