const pagination = require('../middleware/pagination')

module.exports = {
    getAll: (con, param, res) => {		
		const table = "barang_pembelian"
		const column = ["nama_barang_beli", "satuan"]
		pagination(param, res, table, column)
	},
}