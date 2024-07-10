import mongoose from 'mongoose';
//work is here
const { Schema } = mongoose;
const OrderSchema = new Schema({
  items: [
    {
      name: String,
      quantity: Number,
      price: String,
    }
  ],
  totalAmount: Number,
  orderDate: { type: Date, default: Date.now },
  status: { type: String, default: 'active' }
});
      
const UserSchema = new Schema({
  name: {
    type: String,
    
  },
  phone: {
    type: Number,
    
    
  },
  email: {
    type: String,
    
  },
  password: {
    type: String,
    
  },
  feedback :[String],
  orders: [OrderSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const foodItemSchema = new mongoose.Schema({
  name: String,
  description:String,
  special: String,
  category: String,
  price: Number,

}, { collection: 'FoodItems' });

const FoodItem = mongoose.model('FoodItem', foodItemSchema);

//add orders !

const User = mongoose.model('User', UserSchema, 'Menus');
export default { User, FoodItem };