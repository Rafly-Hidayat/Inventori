const pagination = require('../middleware/pagination')

module.exports = {
    getAll: (con, param, res) => {		
		const table = "pembelian"
		const column = ["tgl_pembelian", "kd_supplier"]
		pagination(param, res, table, column)
	},

	getById: (con, kd_pembelian, callback) => {
		con.query(`SELECT * FROM pembelian WHERE kd_pembelian = ${kd_pembelian}`, callback)
	},
	
	// transaction: (con, data, res) => {
	// 	con.beginTracsaction( err => {
	// 		if(err) throw err

	// 		con.query(`SELECT * FROM barang_pembelian WHERE nama_barang_beli = ${data.nama_barang_beli}`, (err, rows) => {
	// 			if(err) throw err

	// 			let harga = rows[4].harga_beli
				
	// 			let jumlah = parseInt(data.quantity)
	// 			let total = harga[0] * jumlah
				
	// 			con.query(`INSERT INTO barang_pembelian SET 
	// 					kd_pembelian = '${data.kd_pembelian}',
	//  					nama_barang_beli = '${data.nama_barang_beli}',
	// 					satuan = '${data.satuan}',
	// 					harga_beli = '${data.harga_beli}',
	// 					item = '${data.item}',
	// 					total = '${total}',
	// 					status = '${data.status}'`, err => {
	// 					if(err) throw err

	// 				let kd_barang_beli = rows[0].kd_barang_beli
	// 				let jumlah = rows[5].item
	// 				let subtotal = rows[6].total

	// 				con.query(`INSERT INTO d_pembelian SET
	// 						kd_pembelian = '${data.kd_pembelian}', kd_barang_beli = ? jumlah = ?, subtotal = ?`, [kd_barang_beli, jumlah, subtotal], err => {
	// 						if(err) throw err
						
	// 					con.query(`INSERT INTO pembelian SET `)
	// 				})
	// 			})
	// 		})
	// 	})
	// }
}