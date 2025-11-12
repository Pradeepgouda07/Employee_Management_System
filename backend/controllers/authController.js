// const User = require('../models/User');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const { jwtSecret } = require('../config');

// exports.register = async (req, res) => {
//     const { name, email, password, role } = req.body;
//     const hashed = await bcrypt.hash(password, 10);
//     const user = new User({ name, email, password: hashed, role });
//     await user.save();
//     res.status(201).send('User Registered');
// };

// exports.login = async (req, res) => {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });
//     if(!user) return res.status(400).send('Invalid Credentials');

//     const match = await bcrypt.compare(password, user.password);
//     if(!match) return res.status(400).send('Invalid Credentials');

//     const token = jwt.sign({ id: user._id, role: user.role }, jwtSecret, { expiresIn: '1d' });
//     res.json({ token, role: user.role });
// };


const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');

// Public signup: always creates an employee
exports.signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password)
            return res.status(400).json({ message: 'All fields are required' });

        // Check for duplicate email
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'Email already in use' });

        const hashed = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashed, role: 'employee' });
        await user.save();

        res.status(201).json({ message: 'User registered successfully', user: { name, email, role: user.role } });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Admin creates another admin (optional)
exports.createAdmin = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password)
            return res.status(400).json({ message: 'All fields are required' });

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'Email already in use' });

        const hashed = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashed, role: 'admin' });
        await user.save();

        res.status(201).json({ message: 'Admin user created successfully', user: { name, email, role: user.role } });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid Credentials' });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(400).json({ message: 'Invalid Credentials' });

        const token = jwt.sign({ id: user._id, role: user.role }, jwtSecret, { expiresIn: '1d' });
        res.json({ token, role: user.role });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};
