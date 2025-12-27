// Importing User model
const User = require('../models/user.js');


async function handleGetAllUsers(req, res) {
    const allUsers = await User.find({});
    return res.json(allUsers)
}

// Get User by ID
async function handleGetUserById(req, res) {
    const user = await User.findById(req.params.id);
    if (!user) {
        return res.status(404).send({ message: 'User not found' });
    }
    return res.json(user);
}

// Create User
async function handleCreateUser(req, res) {
    const body = req.body || req.query;
    if (!body || !body.firstName || !body.gender || !body.age) {
        return res.status(400).json({ message: 'Invalid Data. firstName, gender and age are required.' });
    }

    try {
        const result = await User.create({
            firstName: body.firstName,
            lastName: body.lastName || '',
            gender: body.gender,
            age: body.age,
        });
        return res.status(201).json({ message: 'User created successfully', data: result });
    } catch (error) {
        return res.status(500).json({ message: 'Error creating user', error: error.message });
    }
}

// Update User by ID
async function handleUpdateUserById(req, res) {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
    }
    return res.json({ message: 'User updated successfully', data: updatedUser });
}


// Delete User by ID
async function handleDeleteUserById(req, res) {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
        return res.status(404).json({ message: 'User not found' });
    }
    return res.json({ message: 'User deleted successfully', data: deletedUser });
}

async function handleRenderAllUserHtml(req, res) {
    const allUsers = await User.find({});
    const html = `
        <ul>
            ${allUsers.map(user => `<li>${user.firstName} ${user.lastName} - ${user.gender} - ${user.age}</li>`).join('')}
        </ul>
        `;
    return res.send(html);
}


// Exporting the functions
module.exports = {
    handleGetAllUsers,
    handleGetUserById,
    handleUpdateUserById,
    handleCreateUser,
    handleDeleteUserById,
    handleRenderAllUserHtml
}