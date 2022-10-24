const User = require('../Models/User');
const jwt = require('jsonwebtoken');

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) {
        return res.sendStatus(401); // Unauthorized
    }
    
    const refreshToken = cookies.jwt;
    
    const foundUser = await User.findOne( { refreshToken }).exec();
    if (!foundUser) {
        return res.sendStatus(403);
    } // Forbidden
    
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || foundUser.username !== decoded.username) {
                return res.sendStatus(403);
            }; // Forbidden
            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "username": decoded.username
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '30s' }
            );
            console.log('valid');
            res.json({ accessToken })
        }
    )
}

module.exports = { handleRefreshToken }
