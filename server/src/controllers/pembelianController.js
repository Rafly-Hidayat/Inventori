const Pembelian = require('../models/Pembelian')

module.exports = {
    getAll : (req, res) => {
        let page = req.query.page || 1
        let limit = req.query.limit || 3
        let offset = ( page - 1 ) * limit
        
        Pembelian.getAll(req.con, req.query, limit, offset, (err, rows) => {
            if(err) throw (err)
            Pembelian.get(req.con, (err, results) => {
                if(err) throw (err)
                const pageLimit = Math.ceil(results.length/parseInt(limit))
                res.json({page: `${page} of ${pageLimit}`, result:rows.length, data: rows})
            })
        })
    },

	getById: (req, res) => {
		Pembelian.getById(req.con, req.params.kd_pembelian, (err, rows) => {
			if(err) throw err
			res.json(rows)
		})
	},

    getAllDetail : (req, res) => {
        let page = req.query.page || 1
        let limit = req.query.limit || 3
        let offset = ( page - 1 ) * limit
        
        Pembelian.getAllDetail(req.con, req.query, limit, offset, (err, rows) => {
            if(err) throw (err)
            Pembelian.getDetail(req.con, (err, results) => {
                if(err) throw (err)
                const pageLimit = Math.ceil(results.length/parseInt(limit))
                res.json({page: `${page} of ${pageLimit}`, result:rows.length, data: rows})
            })
        })
    },

	getDetailById: (req, res) => {
		Pembelian.getDetailById(req.con, req.params.kd_pembelian, (err, rows) => {
			if(err) throw err
			res.json(rows)
		})
	},

    getAllBarang : (req, res) => {
        let page = req.query.page || 1
        let limit = req.query.limit || 3
        let offset = ( page - 1 ) * limit
        
        Pembelian.getAllBarang(req.con, req.query, limit, offset, (err, rows) => {
            if(err) throw (err)
            Pembelian.getBarang(req.con, (err, results) => {
                if(err) throw (err)
                const pageLimit = Math.ceil(results.length/parseInt(limit))
                res.json({page: `${page} of ${pageLimit}`, result:rows.length, data: rows})
            })
        })
    },

	getBarangById: (req, res) => {
		Pembelian.getBarangById(req.con, req.params.kd_pembelian, (err, rows) => {
			if(err) throw err
			res.json(rows)
		})
	},

	transaction: (req, res) => {
		Pembelian.transaction(req.con, req.body, res)
	}

}