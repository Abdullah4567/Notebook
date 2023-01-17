const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    port: process.env.PORT,
    key: process.env.SECRET_KEY,
    userName: process.env.USER_NAME,
    password: process.env.PASSWORD
}