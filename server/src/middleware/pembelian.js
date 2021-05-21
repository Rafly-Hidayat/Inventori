const con = require ('../config/db')

module.exports ={
    transaction: (req, res) => {
		con.beginTransaction( err => {
			if(err) throw err

            const post = {
                kd_pembelian: req.body.kd_pembelian,
                kd_supplier: req.body.kd_supplier,
                nama_barang: req.body.nama_barang,
                satuan: req.body.satuan,
                harga_beli: req.body.harga_beli,
                jumlah: req.body.jumlah,
                status: req.body.status
            }

			con.query("SELECT kd_pembelian FROM pembelian WHERE kd_pembelian = ?",[post.kd_pembelian], (err, rows)=> {
				if(err) throw err

				if (rows.length = 0){
					con.query("INSERT INTO pembelian SET kd_pembelian = ?",[post.kd_pembelian], err => {
						if(err) throw err

						let total = parseInt(post.harga_beli) * parseInt(post.jumlah)
					con.query(`INSERT INTO barang_pembelian (kd_pembelian, nama_barang_beli, satuan, harga_beli, item, total, status) VALUE (?,?,?,?,?,?,?)`,[post.kd_pembelian, post.nama_barang, post.satuan, post.harga_beli, post.jumlah, total, post.status], err => {
						if(err) throw err

						con.query("SELECT kd_barang_beli FROM barang_pembelian", (err, result) => {
							if(err) throw err

							let kd_barang_beli = result.map(function (obj) {
								return parseInt(obj.kd_barang_beli)
							})
							const kd_barang = kd_barang_beli[kd_barang_beli.length - 1]

							con.query(`INSERT INTO d_pembelian SET kd_pembelian = ?, kd_barang_beli = ?, jumlah = ?, subtotal = ?`, [post.kd_pembelian, kd_barang, parseInt(post.jumlah), total], err => {
								if(err) throw err

								const tgl_pembelian = new Date()
								con.query('SELECT kd_admin FROM akses_token', (err, result) => {
									if(err) throw err
									let kd_admin = result.map(function (obj) {
										return parseInt(obj.kd_admin)
									})
									const admin = kd_admin[kd_admin.length - 1]

									con.query(`SELECT kd_supplier FROM supplier WHERE kd_supplier = ?`,[post.kd_supplier], (err, result) => {
										if(err) throw err
										let kd_supplier = result.map(function (obj) {
											return parseInt(obj.kd_supplier)
										})

										con.query(`SELECT total FROM barang_pembelian WHERE kd_pembelian = ?`, [post.kd_pembelian], (err, rows) => {
											if(err) throw err
											let total = rows.map(function (obj) {
												return parseInt(obj.total)
											})
											let total_pembelian = total.reduce(function(a,b){    return a + b  }, 0)

											con.query("UPDATE pembelian WHERE kd_pembelian = ? SET tgl_pembelian = ?, kd_admin = ?,  kd_supplier = ?, total_pembelian = ?",[post.kd_pembelian, tgl_pembelian, admin, kd_supplier, total_pembelian], err => {
												if (err) throw err
												res.send("Success")

												con.commit(err => {
													if(err) con.rollback()
												})
											})
										})
									})
								})
							})
						})
					})
					})
				} else {

					let total = parseInt(post.harga_beli) * parseInt(post.jumlah)
					con.query(`INSERT INTO barang_pembelian (kd_pembelian, nama_barang_beli, satuan, harga_beli, item, total, status) VALUE (?,?,?,?,?,?,?)`,[post.kd_pembelian, post.nama_barang, post.satuan, post.harga_beli, post.jumlah, total, post.status], err => {
						if(err) throw err

						con.query("SELECT kd_barang_beli FROM barang_pembelian", (err, result) => {
							if(err) throw err

							let kd_barang_beli = result.map(function (obj) {
								return parseInt(obj.kd_barang_beli)
							})
							const kd_barang = kd_barang_beli[kd_barang_beli.length - 1]

							con.query(`INSERT INTO d_pembelian SET kd_pembelian = ?, kd_barang_beli = ?, jumlah = ?, subtotal = ?`, [post.kd_pembelian, kd_barang, parseInt(post.jumlah), total], err => {
								if(err) throw err

								const tgl_pembelian = new Date()
								con.query('SELECT kd_admin FROM akses_token', (err, result) => {
									if(err) throw err
									let kd_admin = result.map(function (obj) {
										return parseInt(obj.kd_admin)
									})
									const admin = kd_admin[kd_admin.length - 1]

									con.query(`SELECT kd_supplier FROM supplier WHERE kd_supplier = ?`,[post.kd_supplier], (err, result) => {
										if(err) throw err
										let kd_supplier = result.map(function (obj) {
											return parseInt(obj.kd_supplier)
										})

										con.query(`SELECT total FROM barang_pembelian WHERE kd_pembelian = ?`, [post.kd_pembelian], (err, rows) => {
											if(err) throw err
											let total = rows.map(function (obj) {
												return parseInt(obj.total)
											})
											let total_pembelian = total.reduce(function(a,b){    return a + b  }, 0)

											con.query("UPDATE pembelian SET tgl_pembelian = ?, kd_admin = ?,  kd_supplier = ?, total_pembelian = ? WHERE kd_pembelian = ?",[tgl_pembelian, admin, kd_supplier, total_pembelian, post.kd_pembelian, ], err => {
												if (err) throw err
												res.send("Success")

												con.commit(err => {
													if(err) con.rollback()
												})
											})
										})
									})
								})
							})
						})
					})
				}
			})
		})
	}
}


