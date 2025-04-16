const mongoose = require('mongoose');

const uri = 'mongodb+srv://training:shangan@fullstack-training.gw3nkbl.mongodb.net/demoDec?retryWrites=true&w=majority';
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const Cart = mongoose.model('Cart', new mongoose.Schema({}), 'carts'); // 指定 collection 名称

async function dropCartCollection() {
  try {
    await Cart.collection.drop();
    console.log('Cart collection dropped.');
  } catch (error) {
    console.error('Error dropping collection:', error);
  } finally {
    mongoose.disconnect();
  }
}

dropCartCollection();
