const jwt = require("jsonwebtoken");
const { key } = require('../config');
const getUserId = (req, res, next) => {

    try {
        const token = req.header('auth-token');
        // console.log("In backend ", token);
        if (token) {
            const userId = jwt.verify(token, key);
            req.userId = userId;
            return (next());
        }
        else {
            (res.status(400).json({
                success: false,
                message: "Invalid Token"
            }))
        }

    } catch (error) {
        (res.status(400).json({
            success: false,
            message: "Invalid Token"
        }))
    }
}
module.exports = getUserId;