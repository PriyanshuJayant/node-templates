const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function handleUserSignup(req, res) {
    const { name, email, password } = req.body;
    if (!name || !email || !password) 
        return res.status(400).json({ msg: 'All fields are required' });

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({ name, email, password: hashedPassword });

        return res.status(201).json({ msg: 'User created successfully' });
    } catch (error) {
        return res.status(500).json({ msg: 'Error creating user', error: error.message });
    }
}

async function handleUserLogin(req, res) {
    const { email, password } = req.body;
    if (!email || !password) 
        return res.status(400).json({ msg: 'All fields are required' });

    try {
        const user = await User.findOne({ email });
        if (!user) 
            return res.status(401).json({ msg: 'Invalid email or password' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) 
            return res.status(401).json({ msg: 'Invalid email or password' });

        const token = jwt.sign({
            _id: user._id,
            email: user.email,
        }, process.env.JWT_SECRET);

        res.cookie('token', token);
        return res.json({ msg: 'Login Success', token });

    } catch (error) {
        return res.status(500).json({ msg: 'Error logging in', error: error.message });
    }
}

module.exports = {
    handleUserSignup,
    handleUserLogin,
}
