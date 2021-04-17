const express = require('express')
const router = express.Router()
const dataController = require('../controllers/dataController')
const { addBarangValidation } = require('../validator/barang/barang.validation')

router.get('/barang', dataController.getAll)
router.post('/add/barang', addBarangValidation, dataController.add)

module.exports = router