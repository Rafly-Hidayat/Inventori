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

			let total = parseInt(post.harga_beli) * parseInt(post.jumlah)
			
			con.query(`INSERT INTO barang_pembelian (kd_pembelian, nama_barang_beli, satuan, harga_beli, item, total, status) VALUE (?,?,?,?,?,?,?)`,[post.kd_pembelian, post.nama_barang, post.satuan, post.harga_beli, post.jumlah, total, post.status], err => {
				if(err) throw err

				const tgl_pembelian = new Date()
				const admin = con.query('SELECT kd_admin FROM akses_token')
				const kd_admin = admin[admin.length - 1]
				const kd_supplier = con.query(`SELECT kd_supplier FROM supplier WHERE kd_supplier = ?`,[post.kd_supplier])
				// con.query(`SELECT total FROM barang_pembelian WHERE kd_pembelian = ?`, [post.kd_pembelian], (err, rows) => {
				// 	if(err) throw err
				// 	let total_pembelian = rows.reduce((accumulator, currentValue) => {accumulator + currentValue})

					con.query(`INSERT INTO pembelian SET 
					kd_pembelian = ?',
					tgl_pembelian = ?,
					kd_admin = ?,
					kd_supplier = ?`,
					[post.kd_pembelian, tgl_pembelian, kd_admin, kd_supplier], err => {
					if(err) throw err
	
						con.query("SELECT kd_barang_beli FROM barang_pembelian", (err, result) => {
							if(err) throw err
							const kd_barang_beli = result[result.length - 1]

							con.query("SELECT kd_pembelian FROM pembelian ")
							con.query(`INSERT INTO d_pembelian SET
								kd_pembelian = ?, kd_barang_beli = ?, jumlah = ?, subtotal = ?`, [kd_pembelian, kd_barang_beli, post.jumlah, total], err => {
								if(err) throw err
	
								res.send("Success")
								con.commit(err => {
									if(err) con.rollback()
								})
							})
						})
					})
				})	
			// })
		})
	}
}


