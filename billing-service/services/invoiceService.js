const Invoice = require('../models/invoiceModel');

class InvoiceService {
    static async getAllInvoices() {
        return await Invoice.find();
    }

    static async getInvoiceById(id) {
        return await Invoice.findById(id);
    }

    static async createInvoice(data) {
        const invoice = new Invoice(data);
        return await invoice.save();
    }

    static async updateInvoice(id, data) {
        return await Invoice.findByIdAndUpdate(id, data, { new: true });
    }

    static async deleteInvoice(id) {
        return await Invoice.findByIdAndDelete(id);
    }
}

module.exports = InvoiceService;
