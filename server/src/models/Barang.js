const mysql = require('mysql')

module.exports = {
	getAll: (con, callback) => {
		const query = "SELECT * FROM barang"
		con.query(query, callback)
	},

	add: (con, data, callback) => {
		const query = `INSERT INTO barang SET
						kd_barang = '${data.kd_barang}',
						nama_barang = '${data.nama_barang}',
						satuan = '${data.satuan}',
						harga_jual = ${data.harga_jual},
						harga_beli = ${data.harga_beli},
						stok = ${data.stok},
						status = ${data.status}`
		con.query(query, callback)
	}
}