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
	
	transaction: (con, data, res) => {
		con.beginTransaction( err => {
			if(err) throw err

			
			let jumlah = parseInt(data.quantity)
			let total = parseInt(data.jumlah) * jumlah
			
			con.query(`INSERT INTO barang_pembelian SET 
				kd_pembelian = '${data.kd_pembelian}',
				nama_barang_beli = '${data.nama_barang}',
				satuan = '${data.satuan}',
				harga_beli = ${data.harga_beli},
				item = ${data.jumlah},
				total = ?,
				status = ${data.status}`,[total], err => {
				if(err) throw err
				
				const barang_beli = con.query(`SELECT * FROM barang_pembelian WHERE kd_pembelian = ${data.kd_pembelian}`)
				const kd_barang_beli = barang_beli.pop()
				// console.log(barang_beli)
	
				con.query(`SELECT * FROM barang_pembelian WHERE kd_barang_beli = ?`,[kd_barang_beli], (err, rows) => {
					if(err) throw err

					let kd_barang_beli = rows[0].kd_barang_beli
					let jumlah = rows[5].item
					let subtotal = rows[6].total
					let kd_pembelian = rows[1].kd_pembelian

					con.query(`INSERT INTO d_pembelian SET
							kd_pembelian = ?, kd_barang_beli = ? jumlah = ?, subtotal = ?`, [kd_pembelian, kd_barang_beli, jumlah, subtotal], err => {
							if(err) throw err

						const tgl_pembelian = new Date()
						const admin = con.query('SELECT kd_admin FROM akses_token')
						const kd_admin = array_pop(admin)
						const kd_supplier = con.query(`SELECT kd_supplier FROM supplier WHERE kd_supplier = ${data.kd_supplier}`)
						const total = con.query(`SELECT subtotal FROM d_pembelian WHERE kd_pembelian = ?`, [kd_pembelian])
						const total_pembelian = total.reduce(myFunc)
						function myFunc(total, num) {
							return total + num;
						}

						con.query(`INSERT INTO pembelian SET 
							kd_pembelian = '${data.kd_pembelian}',
							tgl_pembelian = ?,
							kd_admin = ?,
							kd_supplier = ?,
							total_pembelian = ?`,
							[tgl_pembelian, kd_admin, kd_supplier, total_pembelian], err => {
							if(err) throw err

							res.send("Success")
							con.commit(err => {
								if(err) con.rollback()
							})
						})
					})
				})
			})
		})
	}
}