const mysql = require('mysql')

module.exports = {
	getAll: (con, param , res, callback) => {
		const query = "Select count(*) as TotalCount from barang"
		con.query(query, (err, rows) => {
			if(err) return err
			totalCount = rows[0].TotalCount			
			if(param.page == null && param.limit == null) {
				startNum = 1;
				LimitNum = 5;
			} else {
				startNum = parseInt(param.page)
				LimitNum = parseInt(param.limit)
			}

			let offset = (startNum - 1) * LimitNum
	   		let endIndex = startNum * LimitNum
	   		let pages = Math.ceil(totalCount/LimitNum)

	   		if(startNum > pages) return res.send('not found.', 404)
			var query = "Select * from ?? limit ? OFFSET ?"
			//Mention table from where you want to fetch records example-users & send limit and start 
			var table = ["barang",LimitNum,offset]
			query = mysql.format(query, table)
			con.query(query, callback)
		})
	},

	getById: (con, id, callback) => {
		const query = `SELECT * FROM barang WHERE kd_barang = '${id}'`
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
	},

	update: (con, data, id, res, callback) => {
		con.query(`SELECT * FROM barang WHERE kd_barang = '${id}'`, (err, rows) => {
			if(err) throw err
			if(rows == 0) return res.send('id barang tidak ditemukan.', 404)
			const query = `UPDATE barang SET
					kd_barang = '${data.kd_barang}',
					nama_barang = '${data.nama_barang}',
					satuan = '${data.satuan}',
					harga_jual = ${data.harga_jual},
					harga_beli = ${data.harga_beli},
					stok = ${data.stok},
					status = ${data.status}
					WHERE kd_barang = '${id}'`
			con.query(query, callback)
		})
	},

	delete: (con, id, res, callback) => {
		con.query(`SELECT * FROM barang WHERE kd_barang = '${id}'`, (e, rows) => {
			if(e) throw e
			if(rows == 0) return res.send('id barang tidak ditemukan.', 404)
			const query = `DELETE FROM barang WHERE kd_barang = '${id}'`
			con.query(query, callback)
		})
	}
}