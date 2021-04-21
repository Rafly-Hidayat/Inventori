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

	update: (con, data, kd_supplier, callback) => {
		const query = `UPDATE supplier SET
						nama_supplier = '${data.nama_supplier}',
						alamat = '${data.alamat}'
						WHERE kd_supplier = ${kd_supplier}`
		con.query(query, callback)
	},

	delete: (con, kd_supplier, callback) => {
		const query = `DELETE FROM supplier WHERE kd_supplier = ${kd_supplier}`
		con.query(query, callback)
	}
}