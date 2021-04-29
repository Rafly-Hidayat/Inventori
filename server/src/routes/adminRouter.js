const express = require('express')
const router = express.Router()
const admincontroller = require('../controllers/adminController')


    router.get('/admin', admincontroller.getAll)

    router.get('/admin/:id', admincontroller.getById)

    router.put('/ubah/admin/:id', admincontroller.update)

    router.delete('/hapus/admin/:id', admincontroller.delete)

module.exports = router