const pagination = require('../middleware/pagination')

module.exports = {  
    getAll: (con, param, res) => {
        const table = "t_penjualan"
        const column = ["kd_penjualan", "tgl_penjualan"]
        pagination(param, res, table, column)
    },

    getById: (con, id_penjualan, callback) => {
        const query = `SELECT * FROM t_penjualan WHERE id_penjualan = '${id_penjualan}'`
		con.query(query, callback)
    },

    transaction: (con, data, res) => {
        con.beginTransaction((e) => {
            if(e) throw e
            con.query(`SELECT stok FROM barang WHERE kd_barang = '${data.kd_barang}'`, (e, result) => {
                if(e) throw e

                let stok = result.map(function(obj) {
					return parseInt(obj.stok)
				})
            

            con.query(`SELECT harga_jual FROM barang WHERE kd_barang = '${data.kd_barang}'`, (e, result) => {
                if(e) throw e

                let harga = result.map(function(obj) {
                    return parseInt(obj.harga_jual)
                }) 
            con.query(`SELECT kd_admin FROM akses_token`, (err, result) => 
            {
                if(err) throw err
                let kd_admin = result.map((obj) => {
                    return parseInt(obj.kd_admin)
                })

                const admin = kd_admin[kd_admin.length - 1]

            let jumlah = parseInt(data.quantity)
            let subtotal  = harga[0] * jumlah
            let random = Math.floor(Math.random() * 100)
            let kd_penjualan = new Date(data.tgl_penjualan).getTime().toString().slice(0, 5) + random
            kd_penjualan.toString()
            
                if(stok >= jumlah) {
                    
                    con.query('INSERT INTO penjualan (kd_penjualan, tgl_penjualan, kd_admin, dibayar, total_penjualan) VALUES (?,?,?,?,?)', [kd_penjualan,data.tgl_penjualan,admin,data.dibayar, data.dibayar], (e, result) => {
                       if(e) throw e
                    })

                    con.query('UPDATE barang SET stok = ?? - ? WHERE kd_barang = ?', ["stok",jumlah,data.kd_barang], (e,result) => {
                        if(e) throw e
                    })

                    con.query('INSERT INTO d_penjualan (kd_penjualan, kd_barang, jumlah, subtotal) VALUES (?,?,?,?)', [kd_penjualan, data.kd_barang, jumlah, subtotal], (e,result) => {
                        if(e) throw e
                    })

                    // input data ke tabel t_penjualan
                    con.query('INSERT INTO t_penjualan (kd_penjualan, kd_barang, tgl_penjualan, jumlah, kd_admin, dibayar, total_penjualan) VALUES (?,?,?,?,?,?,?)', [kd_penjualan, data.kd_barang, data.tgl_penjualan, jumlah, admin, data.dibayar, data.dibayar])

                    con.commit((err) => {
                        if(e) throw e
                        return res.send("SUCCESS")
                    })

                } else {
                    con.rollback()
                    return res.send("Stok atau kd_barang tidak ada!");
                }
            })
            })
            })
        })
    }
}