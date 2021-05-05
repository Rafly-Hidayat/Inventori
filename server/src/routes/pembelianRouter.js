const express = require('express')
const router = express.Router()
const pembelianController = require('../controllers/pembelianController')

    router.get('/pembelian', pembelianController.getAll)

    router.get('/pembelian/:kd_pembelian', pembelianController.getById)

module.exports = router