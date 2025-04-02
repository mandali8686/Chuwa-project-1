const User = require('../models/Users');
const Order = require('../models/Orders');

// Get all users (admin only)
const getAllUsers = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Permission denied' });
        }

        let users;
        if (req.user) {
            users = await User.find();
        } else {
            // Anonymous users get only firstName & lastName
            users = await User.find({}, 'firstName lastName');
        }
        res.status(200).json(users);
    } catch (err) {
        console.error(err.message);
        res.status(400).json({ message: 'Error fetching users' });
    }
};


// [
//     {
//         "role": "user",
//         "orders": [],
//         "_id": "6753bb17c28fe39ea84d60e7",
//         "firstName": "haha",
//         "lastName": "lol",
//         "email": "test@gmail.com",
//         "posts": [],
//         "createdAt": "2024-12-07T03:03:51.327Z",
//         "__v": 0,
//         "updatedAt": "2025-03-27T20:52:02.002Z"
//     },
//     {
//         "_id": "67e5aea93dfd5ca1d4e91807",
//         "firstName": "Yin",
//         "lastName": "Fei",
//         "email": "yinfei@example.com",
//         "password": "12345",
//         "role": "user",
//         "orders": [],
//         "createdAt": "2025-03-27T20:01:45.340Z",
//         "updatedAt": "2025-03-27T20:01:45.340Z",
//         "__v": 0
//     }
// ]

const getOneUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// Create a new user
const createUser = async (req, res) => {
    try {
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        const user = new User(req.body);
        await user.save();
        res.status(201).json({ message: 'User created successfully', user });
    } catch (err) {
        console.log(err.message);
        res.status(400).json({ message: 'Error creating user' });
    }
};

const updateUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update user fields
        user.firstName = req.body.firstName ?? user.firstName;
        user.lastName = req.body.lastName ?? user.lastName;
        user.email = req.body.email ?? user.email;
        user.role = req.body.role ?? user.role;

        await user.save();
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
};

const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(204).json({ message: 'User deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
};

const getUserOrders = async (req, res) => {
    try {
        // Retrieve user by ID (from the authenticated user's session or token)
        const user = await User.findById(req.params.id);  // Assuming user ID is available in req.user
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Get all orders for the user
        const orders = await Order.find({ userId: user._id });

        if (!orders.length) {
            return res.status(404).json({ message: 'No orders found for this user' });
        }

        // Return the user's orders
        res.status(200).json(orders);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    getAllUsers,
    getOneUser,
    createUser,
    updateUser,
    deleteUser,
    getUserOrders
};
