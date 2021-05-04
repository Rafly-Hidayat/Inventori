const express = require('express')
const router = express.Router()
const penjualanController = require('../controllers/penjualanController')

router.get('/penjualan', penjualanController.getAll)
router.get('/penjualan/:kd_penjualan', penjualanController.getById)
// router.post('penjualan', penjualanController.transaction)

module.exports = router