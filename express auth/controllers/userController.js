import UserModel from '../models/User.js'
import ServiceModel from '../models/Services.js'
import BookingModel from '../models/Booking.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import transporter from '../config/emailConfig.js'
import ExpertModel from '../models/Expert.js'
import Stripe from "stripe"
import FCM from "fcm-node";
const serverKey = 'AAAASkp9QyE:APA91bGyROYtC6ki4jnefh5xN9I_7pNOxfQYYEbyr9KTqLSaiaQWlMUU71Q-LxA8i6dmABq39q_dOTjkLctGauFo-0_ZVwiCn2eXKom578213Sq5E5QFpdILdoHcqFHycXNl6MbUtpTQ'; //LIVE ALI Key
const fcm = new FCM(serverKey);
const myt = 'fvs9c_V-QzSQT7m--AEmOb:APA91bHQLDJVa5DMgJGh3nWC4izdrFEASF56r1vkMGxUUVRt-i6HOkiAWu-W23AOovnHDRhzUHKHy8I0jZFk1P-BwK6RNTqeL-8v1JiIAhJrNE_S8V93WuKOFDb4ho3TPXmZILAZfO0n'
class userController {
    static userRegistration = async (req, res) => {
        const { name, email, password, password_confirmation, phone, address, pic, fcm_token } = req.body
        console.log('this is body',req.body)
        const user = await UserModel.findOne({ email: email })
        if (user) {
            res.send({ "status": "failed", "message": "Email already exists" })
        } else {
            if (name && email && password && password_confirmation) {
                if (password === password_confirmation) {
                    try {
                        const salt = await bcrypt.genSalt(10)
                        const hashPassword = await bcrypt.hash(password, salt)
                        const doc = new UserModel({
                            name: name,
                            email: email,
                            password: hashPassword,
                            phone: phone,
                            address: address,
                            pic: pic,
                            fcm_token: fcm_token
                        })
                        console.log(doc);
                        await doc.save()
                        const saved_user = await UserModel.findOne({ email: email })
                        // Generate JWT Token
                        const token = jwt.sign({ userID: saved_user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '5d' })
                        res.status(201).send({ "status": "success", "message": "Registration Success", "token": token })
                    } catch (error) {
                        console.log(error)
                        res.send({ "status": "failed", "message": "Unable to Register" })
                    }
                } else {
                    res.send({ "status": "failed", "message": "Password and Confirm Password doesn't match" })
                }
            } else {
                res.send({ "status": "failed", "message": "All fields are required" })
            }
        }
    }

    static userLogin = async (req, res) => {
        //  {
            const { email, password } = req.body
            console.log(req.body)
            if (email && password) {
                // console.log(req.body)
                const user = await UserModel.findOne({ email: email })
                if (user != null) {
                    const isMatch = await bcrypt.compare(password, user.password)
                    if ((user.email === email) && isMatch) {
                        // Generate JWT Token
                        const token = jwt.sign({ userID: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '555555d' })
                        res.send({ "status": "success", "message": "Login Success", "token": token })
                    } else {
                        res.send({ "status": "failed", "message": "Email or Password is not Valid" })
                    }
                } else {
                    res.send({ "status": "failed", "message": "You are not a Registered User" })
                }
            } else {
                res.send({ "status": "failed", "message": "All Fields are Required" })
            }
        // } catch (error) {
        //     console.log(error)
        //     res.send({ "status": "failed", "message": "Unable to Login" })
        // }
    }

    static changeUserPassword = async (req, res) => {
        const { token, password, password_confirmation } = req.body
        var data = JSON.parse(atob(token.split('.')[1]));
        if (password && password_confirmation) {
            if (password !== password_confirmation) {
                res.send({ "status": "failed", "message": "New Password and Confirm Password doesn't match" })
            } else {
                const salt = await bcrypt.genSalt(10)
                const newHashPassword = await bcrypt.hash(password, salt)
                await UserModel.findByIdAndUpdate(data.userID, { $set: { password: newHashPassword } })
                res.send({ "status": "success", "message": "Password has been changed" })

            }
        }
    }
    static loggedUser = async (req, res) => {
        res.send({ "user": req.user })
    }

    static sendUserPasswordResetEmail = async (req, res) => {
        const { email } = req.body
        if (email) {
            const user = await UserModel.findOne({ email: email })
            if (user) {
                const otp = Math.floor(1000 + Math.random() * 9000)
                user.otp = otp;
                await user.save();
                const secret = user._id + process.env.JWT_SECRET_KEY
                const token = jwt.sign({ userID: user._id }, secret, { expiresIn: '15m' })
                // Send Email
                await transporter.sendMail({
                    from: 'noreply@mail.com',
                    to: user.email,
                    subject: "GetBeauty - Password Reset Otp",
                    html: `
                  <p>You requested for password reset</p>
                  <h5>your OTP to reset password is <br><h1>${otp}</h1></h5>
                  `,
                })
                res.send({ "status": "success", "message": "Password Reset Email Sent... Please Check Your Email", otp: otp, token: token })
            } else {
                res.send({ "status": "failed", "message": "Email doesn't exists" })
            }
        } else {
            res.send({ "status": "failed", "message": "Email Field is Required" })
        }

    }
    static userPasswordReset = async (req, res) => {
        const { password, password_confirmation } = req.body
        const { id, token } = req.params
        const user = await UserModel.findById(id)
        const new_secret = user._id + process.env.JWT_SECRET_KEY
        try {
            jwt.verify(token, new_secret)
            if (password && password_confirmation) {
                if (password !== password_confirmation) {
                    res.send({ "status": "failed", "message": "New Password and Confirm New Password doesn't match" })
                } else {
                    const salt = await bcrypt.genSalt(10)
                    const newHashPassword = await bcrypt.hash(password, salt)
                    await UserModel.findByIdAndUpdate(user._id, { $set: { password: newHashPassword } })
                    res.send({ "status": "success", "message": "Password Reset Successfully" })
                }
            } else {
                res.send({ "status": "failed", "message": "All Fields are Required" })
            }
        } catch (error) {
            console.log(error)
            res.send({ "status": "failed", "message": "Invalid Token" })
        }
    }
    static loadservices = async (req, res) => {
        const id = req.body.id
        console.log(id)
        try {
            const user = ServiceModel.find({ id: id }, function (err, docs) {
                if (err) {
                    console.log(err);
                }
                else {
                    res.send({ "status": "success", "data": docs })
                }
            });
        } catch (error) {
            console.log(error)
            res.send({ "status": "failed", "message": "failed to get list" })
        }
    }
    

    static booking = async (req, res) => {
        const data = req.body
        console.log(req.body)
        const token =  req.body.token
        var docs = JSON.parse(atob(token.split('.')[1]));
        const user = await UserModel.findById(docs.userID)
        const expert = await ExpertModel.findById(data.expertID)
        console.log(req.body, user)
        try {
            const doc = new BookingModel({
                userid: user._id,
                expert: expert,
                user: user,
                service: data.service,
                expertID: data.expertID,
                date: data.date,
                time: data.time,
                method: data.method,
                status: data.status,
            })
            await doc.save()
            await this.sendNotification("Appointment", "Sajid send a request", myt)
            transporter.sendMail({
                from: 'usmughal333@mail.com',
                to: expert.email,
                subject: `New order`,
                html: `
              <p>You have reciened a new order form ${user.name}</p>
              `,
            })

            res.send({ "status": "success", message: "data saved successfully" })
        } catch (error) {
            res.send({ "status": "failed", message: "failed to save data" })
        }
    }

    static loadRequests = async (req, res) => {
        console.log('this is body', req.body)
        const token = req.body.token
        var decrypt = JSON.parse(atob(token.split('.')[1]));
        const user = await UserModel.findById({ _id: decrypt.userID })
        console.log(user)
        try {
            BookingModel.find({ userid: user._id }, function (err, docs) {
                if (err) {
                    console.log(err);
                }
                else {
                    res.send({ "status": "success", "data": docs })
                }
            });
        } catch (error) {
            console.log(error)
            res.send({ "status": "failed", "message": "failed to get list" })
        }
    }
    static loadprofile = async (req, res) => {
        console.log('loadprofile')
        const token =  req.body.token
        var data = JSON.parse(atob(token.split('.')[1]));
        try {
            const docs = await UserModel.findById(data.userID)
            if (docs) {
                res.send({ "status": "success", "data": docs })
            } else {
                res.send({ "status": "failed", "message": "user not found" })

            }

        } catch (error) {
            console.log(error)
            res.send({ "status": "failed", "message": "failed to get user" })
        }
    }
    static updateprofile = async (req, res) => {
        const data = req.body
        const token = req.body.token

        var d = JSON.parse(atob(token.split('.')[1]));


        try {
            const user = UserModel.findByIdAndUpdate(d.userID,
                {
                    name: data.name,
                    parlourName: data.parlourName,
                    address: data.address,
                    phone: data.phone,
                    pic: data.pic,
                    about: data.about,
                }, function (err, docs) {
                    if (err) {
                        console.log(err)
                    }
                    else {
                        res.send({ "status": "success", "message": "Profile update successfully" })
                    }
                })
            console.log(user)
        } catch (error) {
            console.log(error)
            res.send({ "status": "failed", "message": "failed to get list" })
        }
    }


    static payment = async (req, res) => {
        // Use an existing Customer ID if this is a returning customer.
        const { amount, currency } = req.body

        const customer = await stripe.customers.create();
        const ephemeralKey = await stripe.ephemeralKeys.create(
            { customer: customer.id },
            { apiVersion: '2022-11-15' }
        );
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: currency,
            customer: customer.id,
            payment_method_types: ['card']


        });

        res.json({
            paymentIntent: paymentIntent.client_secret,
            ephemeralKey: ephemeralKey.secret,
            customer: customer.id,

        });
    };
    static loaduser = async (req, res) => {
        console.log('loaduser')
        console.log(req.body)
        const token = req.body.token


        if (token) {
            var data = JSON.parse(atob(token.split('.')[1]));
        }

        if (token) {
            try {
                const user = await UserModel.findById(data.userID)
                if (user) {
                    res.send({ "status": "success", "data": "user" })
                } else {
                    const expert = await ExpertModel.findById(data.userID)
                    if (expert) {
                        res.send({ "status": "success", "data": "expert" })
                    }
                }

            } catch (error) {
                console.log(error)
                res.send({ "status": "failed", "message": "failed to get user" })
            }
        }

        else {
            res.send({ "status": "failed", "message": "failed to get user" })
        }
    }
    static getlist = async (req, res) => {
        console.log('req made')

        try {
            UserModel.find({}, function (err, result) {
                if (err) {
                    res
                        .status(200)
                        .json({ 'status': 'success', "message": err.message });
                } else {
                    res
                        .status(200)
                        .json({ 'status': 'success', "data": result });
                }
            });
        } catch (error) {
            console.log(error)
            res.send({ "status": "failed", "message": "failed to get list" })
        }
    }
    static getUserData = async (req, res) => {
        console.log('req made')

        try {
            UserModel.find({}, function (err, result) {
                if (err) {
                    res
                        .status(200)
                        .json({ 'status': 'success', "message": err.message });
                } else {
                    res
                        .status(200)
                        .json({ 'status': 'success', "data": result });
                }
            });
        } catch (error) {
            console.log(error)
            res.send({ "status": "failed", "message": "failed to get list" })
        }
    }



    // var UsereModel = require('../models/user.model');
    // NOTIFICATION FUNCTION 
    static sendNotification = async (notificationTitle, notificationMsg, m, count = 0) => {
        //   let action_user = await UsereModel.findOne({_id: action_id});
        var message = {
            to: "fvs9c_V-QzSQT7m--AEmOb:APA91bHQLDJVa5DMgJGh3nWC4izdrFEASF56r1vkMGxUUVRt-i6HOkiAWu-W23AOovnHDRhzUHKHy8I0jZFk1P-BwK6RNTqeL-8v1JiIAhJrNE_S8V93WuKOFDb4ho3TPXmZILAZfO0n",
            collapse_key: 'get_buty',
            notification: {
                title: notificationTitle,
                body: notificationMsg
            },
            data: {
                count: count,
            }
        };
        console.log("sendNotification-message", message)
        fcm.send(message, function (err, response) {
            if (err) {
                console.log(err);
                console.log("Something has gone wrong!");
            } else {
                console.log("Successfully sent with response: ", response);
            }
        });
    };
}





export default userController