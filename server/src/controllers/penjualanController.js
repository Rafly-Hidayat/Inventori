const Penjualan = require('../models/Penjualan')

module.exports = {
    getAll: (req, res) => {
        let page = req.query.page || 1
        let limit = req.query.limit || 3
        let offset = ( page - 1 ) * limit
        
        Penjualan.getAll(req.con, req.query, limit, offset, (err, rows) => {
            if(err) throw (err)
            Penjualan.get(req.con, (err, results) => {
                if(err) throw (err)
                const pageLimit = Math.ceil(results.length/parseInt(limit))
                res.json({page: `${page} of ${pageLimit}`, result:rows.length, data: rows})
            })
        })
    },

    getById: (req, res) => {
        Penjualan.getById(req.con, req.params.id_penjualan, (err, rows) => {
            if(err) throw err
			rows.length == 0 ? res.send('id barang tidak ditemukan.', 404) : res.json({ data: rows })
        })
    },

     getAllDetail : (req, res) => {
        let page = req.query.page || 1
        let limit = req.query.limit || 3
        let offset = ( page - 1 ) * limit
        
        Penjualan.getAllDetail(req.con, req.query, limit, offset, (err, rows) => {
            if(err) throw (err)
            Penjualan.getDetail(req.con, (err, results) => {
                if(err) throw (err)
                const pageLimit = Math.ceil(results.length/parseInt(limit))
                res.json({page: `${page} of ${pageLimit}`, result:rows.length, data: rows})
            })
        })
    },

    getDetailById: (req, res) => {
		Penjualan.getDetailById(req.con, req.params.kd_pembelian, (err, rows) => {
			if(err) throw err
			res.json(rows)
		})
	},

    transaction: (req, res) => {
        Penjualan.transaction(req.con, req.body, res)
    }
}