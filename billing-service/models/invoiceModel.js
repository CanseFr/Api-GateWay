const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
    number: { type: String, required: true, unique: true },
    client: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    status: { type: String, enum: ['paid', 'unpaid', 'pending'], default: 'unpaid' },
});

module.exports = mongoose.model('Invoice', invoiceSchema);
