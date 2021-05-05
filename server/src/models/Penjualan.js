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
            

            let jumlah = parseInt(data.quantity)
            let subtotal  = harga[0] * jumlah
            
                if(stok >= jumlah) {
                    con.query('INSERT INTO d_penjualan (kd_barang, kd_penjualan, jumlah, subtotal) VALUES (?,?,?,?)', [data.kd_barang,data.kd_penjualan,jumlah,subtotal], (e, result) => {
                        if(e){
                            con.rollback(() => {
                            return res.send("Something bad happened. Successfully rollback.")	
                            })
                        }
                    })

                    con.query('UPDATE barang SET stok = ?? - ? WHERE kd_barang = ?', ["stok",jumlah,data.kd_barang], (e,result) => {
                        if(e){
                            con.rollback(() => {
                            return res.send("Something bad happened. Successfully rollback.")	          
                            })
                        }
                    })

                    con.commit((err) => {
                        if(err){
                            con.rollback(()=> {
                                throw err
                            })    				 		
                        }
                        return res.send("SUCCESS")
                    })

                } else {
                    con.rollback()
                    return res.send("Stok atau kd_barang tidak ada!");
                }

            })
            })
        })
    }
}