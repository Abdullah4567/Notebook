const jwt = require("jsonwebtoken");
const KEY = "A quick brown fox jumps over the lazy dog"
const getUserId = (req, res, next) => {

    try {
        const token = req.header('auth-token');
        // console.log("In backend ", token);
        if (token) {
            const userId = jwt.verify(token, KEY);
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