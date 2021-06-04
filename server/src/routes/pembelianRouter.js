const express = require('express')
const router = express.Router()
const pembelianController = require('../controllers/pembelianController')

    router.get('/pembelian', pembelianController.getAll)

    router.get('/pembelian/:kd_pembelian', pembelianController.getById)

    router.get('/detail', pembelianController.getAllDetail)

    router.get('/detail/:id_pembelian', pembelianController.getDetailById)

    router.get('/barang_pembelian', pembelianController.getAllBarang)

    router.get('/barang_pembelian/:kd_barang_beli', pembelianController.getBarangById)

    router.post('/pembelian', pembelianController.transaction)

module.exports = router