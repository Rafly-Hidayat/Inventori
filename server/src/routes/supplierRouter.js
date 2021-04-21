const express = require('express')
const router = express.Router()
const supplierController = require('../controllers/supplierController')
const { addSupplierValidation } = require('../validator/supplier/supplier.validation')

// Router Supplier
router.get('/supplier', supplierController.getAll)
router.post('/add/supplier', addSupplierValidation, supplierController.add)
router.put('/update/supplier/:kd_supplier', addSupplierValidation, supplierController.update)
router.delete('/delete/supplier/:kd_supplier', supplierController.delete)

module.exports = router