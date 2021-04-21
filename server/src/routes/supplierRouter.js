const express = require('express')
const router = express.Router()
const supplierController = require('../controllers/supplierController')
const { addSupplierValidation } = require('../validator/supplier/supplier.validation')

// Router Supplier
router.get('/supplier', supplierController.getAll)
router.post('/add/supplier', addSupplierValidation, supplierController.add)
router.put('/ubah/supplier/:id', addSupplierValidation, supplierController.update)

module.exports = router