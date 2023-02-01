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
const multer = require('multer') // used to handle multi part data / form data
// const fsPromises = require('fs').promises; // file system
// const v8 = require('v8');
const { imageUrl, clientID, dummyPassword } = require('../config');
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(clientID)
const cloudinary = require('../storage/cloudinary')

// following 3 things are important for any image
// 1- Path of image
// 2- Image Size
// 3- Extension of File

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // console.log("I am disk storage")
        cb(null, 'images')
    },
    filename: function (req, file, cb) {
        // console.log("Fieldname : " + file.fieldname);
        // console.log("I am fileName");

        // `\`
        cb(null, Date.now() + '-' + file.originalname)
    }
})
const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        // To accept the file pass `true`, like so:
        // console.log("I am filtering");
        cb(null, true)
    }
    else {
        // To reject this file pass `false`, like so:
        cb(null, false)
    }
}
const uploadPicture = (req, res, next) => {
    const upload = multer({
        storage: storage,
        limits: {
            fileSize: 5 * 1024 * 1024   //5MB
        },
        fileFilter: fileFilter
    }).single('ProfilePic');
    upload(req, res, function (err) {
        if (!err) {
            return (next());
        }
        else {
            return (res.status(400).json({
                success: false,
                message: err.message
            }))
        }
        // if (err instanceof multer.MulterError) {
        //     // A Multer error occurred when uploading.
        //     console.log("I am in multer Error", err.message);
        //     return (res.status(400).json({
        //         success: false,
        //         message: err.message
        //     }))

        // } else if (err) {
        //     // An unknown error occurred when uploading.
        //     console.log("Some other Error occurred when uploading");
        //     console.log(err.message);
        //     return (res.status(400).json({
        //         success: false,
        //         message: err.message
        //     }))
        // }
        // else {
        //     return (next());
        // }
        // Everything went fine. 
    })

}
// Create User via Post : "/api/auth/createuser" does not require Authentication
router.post('/createuser', uploadPicture, [
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


        // console.log("Image Path " + req.file.path);
        //verifying Email by using npm package deep-email-validator
        const IsValid = await verifyEmail(req.body.email);
        if (!IsValid.valid) {
            return res.status(400).json({
                success: false,
                message: "Invalid Email Address"
            })
        }
        // hashing password
        const salt = bcrypt.genSaltSync(10);
        // console.log(salt);
        const pass = await bcrypt.hash(req.body.password, salt);
        console.log("File " + req.file.filename);
        //uploading Picture to Cloudinary
        const result = await cloudinary.v2.uploader.upload(req.file.path, { folder: "NoteBook" });
        // creating a new user 
        user = await User.create({
            name: req.body.name,
            password: pass,
            email: req.body.email,
            age: req.body.age,
            createdAt: Date.now(),
            image: req.file.filename
        });
        // generating Authentication Token
        const authToken = jwt.sign({
            id: user.id
        }, key)
        res.status(200).json({
            success: true,
            token: authToken,
            user: {
                name: user.name,
                age: user.age,
                email: user.email,
                image: `${imageUrl + user.image}`
            }
        })
        console.log(result);
        ComposeEmail(req.body.email, req.body.name);
        // console.log(req.body);
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
                    token: authToken,
                    user: {
                        name: user.name,
                        age: user.age,
                        email: user.email,
                        image: `${imageUrl + user.image}`
                    }
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

// Login with Google : post  "/api/auth/login-with-google"  not login required
router.post("/login-with-google", async (req, res) => {
    try {
        if ("tokenId" in req.body && "accessToken" in req.body && "googleId" in req.body) {
            const { tokenId, accessToken, googleId } = req.body;
            client.verifyIdToken({ idToken: tokenId, audience: clientID })
                .then(async (response) => {
                    // console.log(response);
                    const { name, email, email_verified, picture } = response.payload;
                    if (email_verified) {

                        // If user already Exist
                        let user = await User.findOne({ email: email });
                        let userExist = true;
                        if (!user) {

                            const salt = bcrypt.genSaltSync(10);
                            // console.log(salt);
                            const pass = await bcrypt.hash(dummyPassword, salt);
                            // Creating a new User
                            user = await User.create({
                                name: name,
                                password: pass,
                                email: email,
                                age: 22,
                                // age is hardcoded here. You can get it by hitting google api again.
                                createdAt: Date.now(),
                                image: picture
                            });
                            userExist = false;
                        }
                        // generating Authentication Token
                        const authToken = jwt.sign({
                            id: user.id
                        }, key)
                        res.status(200).json({
                            success: true,
                            token: authToken,
                            user: {
                                name: user.name,
                                age: user.age,
                                email: user.email,
                                image: user.image
                            }
                        })
                        if (!userExist) {
                            ComposeEmail(email, name);
                        }
                    }
                    else {
                        res.status(400).json({
                            success: false,
                            message: "Account not verified"
                        })
                    }

                }).catch((err) => {
                    console.log(err)
                    res.status(400).json({
                        success: false,
                        message: "Invalid TokenId"
                    })
                })
        }
        else {
            res.status(400).json({
                success: false,
                message: "Invalid Request"
            })
        }
    } catch (err) {
        console.log(err.message);
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
                age: user.age,

            }
        }))
    } catch (error) {
        console.log(error.message);
        return (res.status(500).json("Internal Server Error"));
    }
})
module.exports = router;
