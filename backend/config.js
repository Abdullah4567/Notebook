const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    port: process.env.PORT,
    key: process.env.SECRET_KEY,
    userName: process.env.USER_NAME,
    password: process.env.PASSWORD,
    dbUrl: process.env.DB_URL,
    dbName: process.env.DB_NAME,
    imageUrl: process.env.Image_Url,
    clientID: process.env.CLIENT_ID,
    dummyPassword: process.env.DUMMY_PASSWORD,
    cloudName: process.env.CLOUD_NAME,
    apiKey: process.env.API_KEY,
    apiSecret: process.env.API_SECRET

}