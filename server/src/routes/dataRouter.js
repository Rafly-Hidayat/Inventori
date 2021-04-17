const express = require('express')
const router = express.Router()
const dataController = require('../controllers/dataController')

router.get('/barang', dataController.getAll)

module.exports = router