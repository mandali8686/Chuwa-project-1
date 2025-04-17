const User = require('../models/Users');
const Order = require('../models/Orders');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
require('dotenv').config();
const jwt = require('jsonwebtoken');


const getAllUsers = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Permission denied' });
        }

        let users;
        if (req.user) {
            users = await User.find();
        } else {
            users = await User.find({}, 'firstName lastName');
        }
        res.status(200).json(users);
    } catch (err) {
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
    //const {firstName, lastName, email, password} = req.body
    try {
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }
        const user = new User(req.body);
        if (req.body.password) {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            user.password = hashedPassword;
        }
        
        await user.save();
        res.status(201).json({ message: 'User created successfully', user });
    } catch (err) {
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
        if (req.body.password) {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            user.password = hashedPassword;
        }

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
        res.status(500).json({ message: 'Server error' });
    }
};

const sendResetEmail = async (req, res) => {
    const { email } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(404).json({ message: 'User not found' });
      console.log(user);
  
      const token = jwt.sign(
        {
          user: {
            id: user._id,
            email: user.email,
          }
        },
        'ffffffffffff',
        { expiresIn: '15m' }
      );
  
      await user.save();
  
      const resetLink = `http://localhost:3000/update-password/${token}`;
  
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER, // e.g., yourname@gmail.com
          pass: process.env.EMAIL_PWD  // your Gmail App Password or SMTP password
        }
      });
  
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Password Reset Request',
        html: `
          <h2>Password Reset</h2>
          <p>Click the link below to reset your password. This link is valid for 15 minutes.</p>
          <a href="${resetLink}">${resetLink}</a>
        `
      };
  
      await transporter.sendMail(mailOptions);
      res.json({ message: 'Reset email sent successfully.' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error sending reset email.' });
    }
  };

module.exports = {
    getAllUsers,
    getOneUser,
    createUser,
    updateUser,
    deleteUser,
    getUserOrders,
    sendResetEmail
};
