const pagination = require('../middleware/pagination')

module.exports = {
    getAll: (con, param, res) => {
		const table = "pembelian"
		const column = ["tgl_pembelian", "kd_supplier"]
		pagination(param, res, table, column)
	},

	getById: (con, kd_pembelian, callback) => {
		con.query(`SELECT * FROM pembelian WHERE kd_pembelian = ${kd_pembelian}`, callback)
	}
}