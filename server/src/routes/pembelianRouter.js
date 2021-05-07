const express = require('express')
const router = express.Router()
const pembelianController = require('../controllers/pembelianController')
const pembelian = require('../middleware/pembelian')

    router.get('/pembelian', pembelianController.getAll)

    router.get('/pembelian/:kd_pembelian', pembelianController.getById)

    // router.post('/pembelian', pembelianController.transaction)

    router.post('/pembelian', pembelian.transaction)

module.exports = router