const InvoiceService = require('../services/invoiceService');

class InvoiceController {
    static async getAll(req, res) {
        try {
            const invoices = await InvoiceService.getAllInvoices();
            res.status(200).json(invoices);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getById(req, res) {
        try {
            const invoice = await InvoiceService.getInvoiceById(req.params.id);
            if (!invoice) return res.status(404).json({ message: 'Invoice not found' });
            res.status(200).json(invoice);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async create(req, res) {
        try {
            const invoice = await InvoiceService.createInvoice(req.body);
            res.status(201).json(invoice);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async update(req, res) {
        try {
            const invoice = await InvoiceService.updateInvoice(req.params.id, req.body);
            if (!invoice) return res.status(404).json({ message: 'Invoice not found' });
            res.status(200).json(invoice);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async delete(req, res) {
        try {
            const invoice = await InvoiceService.deleteInvoice(req.params.id);
            if (!invoice) return res.status(404).json({ message: 'Invoice not found' });
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = InvoiceController;
