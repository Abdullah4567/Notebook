const cloudniary = require('cloudinary');
const { cloudName, apiKey, apiSecret } = require('../config')
cloudniary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret
})
module.exports = cloudniary;