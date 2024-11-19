const express = require('express');
const InvoiceController = require('../controllers/invoiceController');

const router = express.Router();

router.get('/', InvoiceController.getAll);
router.get('/:id', InvoiceController.getById);
router.post('/', InvoiceController.create);
router.put('/:id', InvoiceController.update);
router.delete('/:id', InvoiceController.delete);

module.exports = router;
