const emailValidator = require('deep-email-validator');
const verifyEmail = async (email) => {
    try {
        const res = await emailValidator.validate(email)
        if (res.valid) {
            return {
                valid: true,
            }
        }
        else {
            // console.log(res)
            return ({
                ...res.validators.smtp
            })
        }
    } catch (err) {
        console.log(err)

    }
}
module.exports = verifyEmail;