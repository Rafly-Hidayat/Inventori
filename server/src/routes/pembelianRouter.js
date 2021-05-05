const express = require('express')
const router = express.Router()
const pembelianController = require('../controllers/pembelianController')

    router.get('/pembelian', pembelianController.getAll)

module.exports = router