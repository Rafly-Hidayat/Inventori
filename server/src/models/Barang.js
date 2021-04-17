const mysql = require('mysql')

module.exports = {
	getAll: (con, callback) => {
		const query = "SELECT * FROM barang"
		con.query(query, callback)
	}
}