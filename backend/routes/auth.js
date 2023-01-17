const express = require('express');
const router = express.Router();
const User = require('../modals/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const getUserId = require('../Middlewares/Login');
const { key } = require('../config');
const ComposeEmail = require('../email/ComposeEmail');
const verifyEmail = require('../email/verifyEmail');

// Create User via Post : "/api/auth/createuser" does not require Authentication
router.post('/createuser', [
    // Validating Credentials 
    body('email', 'Invalid Format of Email')?.isEmail(),
    body('name', 'Name length Should be more than 2')?.trim().isLength({ min: 3 }),
    body('password', 'password length should be more than 3')?.trim().isLength({ min: 3 }),
    body('age', 'Age should be between 15 and 60')?.isInt({ min: 15, max: 59 }),
], async (req, res) => {

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }

        // If user already Exist
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({
                success: false,
                message: "Email already Taken"
            })
        }


        //verifying Email by using npm package deep-email-validator
        const IsValid = await verifyEmail(req.body.email);
        if (!IsValid.valid) {
            return res.status(400).json({
                success: false,
                message: "Invalid Email Address"
            })
        }

        ComposeEmail(req.body.email);
        // hashing password
        const salt = bcrypt.genSaltSync(10);
        // console.log(salt);
        const pass = await bcrypt.hash(req.body.password, salt);
        // creating a new user 
        user = await User.create({
            name: req.body.name,
            password: pass,
            email: req.body.email,
            age: req.body.age,
            createdAt: Date.now()
        });
        // generating Authentication Token
        const authToken = jwt.sign({
            id: user.id
        }, key)

        res.status(200).json({
            success: true,
            token: authToken
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).json("Internal Server Error");
    }
})

// Login User via post : "/api/auth/login"    login not required
router.post('/login', [
    // Validating Credentials 
    body('email', 'Invalid Format of Email')?.isEmail(),
    body('password', 'password length should be more than 3')?.trim().isLength({ min: 3 }),
], async (req, res) => {

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }
        // If user Exist
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            const result = await bcrypt.compare(req.body.password, user.password)
            if (result) {
                // generating Authentication Token
                const authToken = jwt.sign({
                    id: user.id
                }, key)
                return (res.status(200).json({
                    success: true,
                    token: authToken
                }))
            }
        }
        return (res.status(400).json({
            success: false,
            message: "Invalid Credentials"
        }));
    } catch (error) {
        console.log(error.message);
        res.status(500).json("Internal Server Error");
    }
})

// GetUserData  via Get : "/api/auth/getuser"   login required
router.get('/getuser', getUserId, async (req, res) => {

    try {
        // getting user id with help of middleware
        let user = await User.findOne({ id: req.userId });
        // console.log(req.userId)
        return (res.status(200).json({
            success: true,
            user: {
                name: user.name,
                email: user.email,
                age: user.age
            }
        }))
    } catch (error) {
        console.log(error.message);
        return (res.status(500).json("Internal Server Error"));
    }
})
module.exports = router;