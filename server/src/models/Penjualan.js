const pagination = require('../middleware/pagination')

module.exports = {
	getAll: (con, param, res) => {
		const table = "penjualan"
		const column = ["kd_penjualan", "tgl_penjualan"]
		pagination(param, res, table, column)
	},

	getById: (con, kd_penjualan, callback) => {
		const query = `SELECT * FROM penjualan WHERE kd_penjualan = '${kd_penjualan}'`
		con.query(query, callback)
	},

	transaction: (con, data, res, callback) => {
		con.beginTransaction((e) => {
			if(e) throw e
			const post = {
				kd_penjualan: data.kd_penjualan
			}

			con.query
		})
	}
}