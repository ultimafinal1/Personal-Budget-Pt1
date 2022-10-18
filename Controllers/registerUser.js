const User = require('../Models/User');

const handleNewUser = async (req, res) => {
    const user = req.body;
    try {
        const result = await User.create({
            "username": user.username,
            "password": user.password
        })
    console.log(result);
    res.status(201).json({ 'success': `New user ${user.username} created`});
} catch (err) {
    res.status(500).json({ 'message': err.message });
    }
}

module.exports = { handleNewUser };
