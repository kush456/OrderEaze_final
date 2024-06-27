const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  orderDate: { type: Date, default: Date.now },
  items: [{ 
    name: String,
    quantity: Number,
    price: Number
  }],
  totalAmount: { type: Number, required: true }
});

module.exports = mongoose.model('Order', orderSchema,"Orders");