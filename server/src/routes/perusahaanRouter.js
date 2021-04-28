const express = require('express')
const router = express.Router()
const perusahaanController = require('../controllers/perusahaanController')
const { perusahaanValidation } = require('../validator/perusahaan/perusahaan.validation')

// Router perusahaan
router.get('/perusahaan', perusahaanController.getAll)
router.get('/perusahaan/:id', perusahaanController.getById)
router.post('/tambah/perusahaan', perusahaanValidation, perusahaanController.add)
router.put('/ubah/perusahaan/:id', perusahaanValidation, perusahaanController.update)
router.delete('/hapus/perusahaan/:id', perusahaanController.delete)
module.exports = router