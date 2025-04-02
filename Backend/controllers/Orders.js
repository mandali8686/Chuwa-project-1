const Order = require('../models/Orders')
const User = require('../models/Users');

const createOrder = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.user.email });
        const { items, totalAmount } = req.body
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const newOrder = new Order({
            userId: user._id,
            items,
            totalAmount
        });
        await newOrder.save();

        await User.updateOne({ _id: userId }, { $push: { orders: newOrder._id } })
//update the orders array without triggering validation on the password field by using updateOne
        res.status(201).json(newOrder);
    } catch(err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server Error' });
    }
}

module.exports = {
  createOrder
};
