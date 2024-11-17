const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');  // Make sure to import your User model

const router = express.Router();

router.post('/login', async (req, res) => {
    console.log("Request Body: ", req.body);  // Use for debugging

    const { emailOrUsername, password } = req.body;

    if (!emailOrUsername || !password) {
        return res.status(400).json({ message: 'Email or Username and Password are required!' });
    }

    try {
        const user = await User.findOne({
            $or: [{ email: emailOrUsername }, { userName: emailOrUsername }]
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({
            message: 'Login successful!',
            token,
            userData: {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            }
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Something went wrong!' });
    }
});

module.exports = router;
