const express = require('express')
const router = express.Router()
const penjualanController = require('../controllers/penjualanController')
const { addPenjualanValidation } = require('../validator/penjualan/penjualan.validation')

router.get('/penjualan', penjualanController.getAll)
router.get('/penjualan/:kd_penjualan', penjualanController.getById)
router.post('/penjualan', addPenjualanValidation, penjualanController.transaction)

module.exports = router