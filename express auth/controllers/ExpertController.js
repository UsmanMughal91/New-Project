import UserModel from '../models/User.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import transporter from '../config/emailConfig.js'
import ExpertModel from '../models/Expert.js'
import ServiceModel from '../models/Services.js'
import BookingModel from '../models/Booking.js'

class ExpertController {
    static userRegistration = async (req, res) => {
        // console.log(req.body)
        const { name, email, password, password_confirmation, parlourName, phone, address, pic } = req.body
        console.log(req.body)
        const user = await ExpertModel.findOne({ email: email })
        if (user) {
            res.send({ "status": "failed", "message": "Email already exists" })
        } else {
            if (name && email && password && password_confirmation && parlourName && phone && address && pic) {
                if (password === password_confirmation) {
                    try {
                        const salt = await bcrypt.genSalt(10)
                        const hashPassword = await bcrypt.hash(password, salt)
                        const doc = new ExpertModel({
                            name: name,
                            email: email,
                            password: hashPassword,
                            phone: phone,
                            parlourName: parlourName,
                            address: address,
                            pic: pic

                        })
                        await doc.save()
                        const saved_user = await ExpertModel.findOne({ email: email })
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
        try {
            const { email, password } = req.body
            if (email && password) {
                console.log(req.body)
                const user = await ExpertModel.findOne({ email: email })
                if (user != null) {
                    const isMatch = await bcrypt.compare(password, user.password)
                    if ((user.email === email) && isMatch) {
                        // Generate JWT Token
                        const token = jwt.sign({ userID: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '5d' })
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
        } catch (error) {
            console.log(error)
            res.send({ "status": "failed", "message": "Unable to Login" })
        }
    }

    static changeUserPassword = async (req, res) => {

        const { token, password, password_confirmation } = req.body
        console.log(req.body)
        var data = JSON.parse(atob(token.split('.')[1]));
        if (password && password_confirmation) {
            if (password !== password_confirmation) {
                res.send({ "status": "failed", "message": "Password and Confirm Password doesn't match" })
            } else {
                const salt = await bcrypt.genSalt(10)
                const newHashPassword = await bcrypt.hash(password, salt)
                await ExpertModel.findByIdAndUpdate(data.userID, { $set: { password: newHashPassword } })
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
            const user = await ExpertModel.findOne({ email: email })
            if (user) {
                const secret = user._id + process.env.JWT_SECRET_KEY
                const token = jwt.sign({ userID: user._id }, secret, { expiresIn: '15m' })
                const link = `http://127.0.0.1:3000/api/Expert/reset/${user._id}/${token}`
                console.log(link)
                // // Send Email
                // let info = await transporter.sendMail({
                //   from: process.env.EMAIL_FROM,
                //   to: user.email,
                //   subject: "GeekShop - Password Reset Link",
                //   html: `<a href=${link}>Click Here</a> to Reset Your Password`
                // })
                res.send({ "status": "success", "message": "Password Reset Email Sent... Please Check Your Email" })
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
        const user = await ExpertModel.findById(id)
        const new_secret = user._id + process.env.JWT_SECRET_KEY
        try {
            jwt.verify(token, new_secret)
            if (password && password_confirmation) {
                if (password !== password_confirmation) {
                    res.send({ "status": "failed", "message": "New Password and Confirm New Password doesn't match" })
                } else {
                    const salt = await bcrypt.genSalt(10)
                    const newHashPassword = await bcrypt.hash(password, salt)
                    await ExpertModel.findByIdAndUpdate(user._id, { $set: { password: newHashPassword } })
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
    static getlist = async (req, res) => {
        console.log('req made')

        try {
            ExpertModel.find({}, function (err, result) {
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

    static loadprofile = async (req, res) => {
        console.log('loadprofile')
        const token = req.body.token
        var data = JSON.parse(atob(token.split('.')[1]));
        try {
            const docs = await ExpertModel.findById(data.userID) 
            console.log(docs)
            if(docs){
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
        console.log("edit profile data",data)
        const token = req.body.token
        var d = JSON.parse(atob(token.split('.')[1]));
            try {
                const user = ExpertModel.findByIdAndUpdate(d.userID,
                    {
                        name:data.name,
                        parlourName:data.parlourName,
                        address:data.address,
                        phone:data.phone,
                        pic:data.pic,
                        about:data.about,
                        daysX:data.daysX,
                        daysY: data.daysY,
                        daysZ: data.daysZ,
                        timeX:data.timeX,
                        timeY:data.timeY,
                        timeZ:data.timeZ
                }, function (err,docs) {
                    if (err){
                        console.log(err)
                    }
                    else{
                        res.send({ "status": "success", "message": "Profile update successfully" })
                    }
                })
                console.log(user)
            } catch (error) {
                console.log(error)
                res.send({ "status": "failed", "message": "failed to get list" })
            }
    }

    static addservice = async (req, res) => {
        const data = req.body
        console.log(data)
        const token = req.body.token
        var d = JSON.parse(atob(token.split('.')[1]));
        const exists = await ServiceModel.findOne({serviceName:data.serviceName})
        if(!exists) {
            try {
                const doc = new ServiceModel({
                    id: d.userID,
                    serviceName: data.serviceName,
                    servicePrice: data.servicePrice,
                    serviceDetails: data.serviceDetails,
                    pic: data.pic,
                })
                await doc.save()
                res.status(201).send({ "status": "success", "message": "Service added Successfully" })
            } catch (error) {
                console.log(error)
                res.send({ "status": "failed", "message": "Failed to add service" })
            }
        } else {
            res.send({ "status": "failed", "message": "Service already exists" })
        }
    }
    static loadservices = async (req, res) => {
        console.log('req made')
        const token = req.body.token
        console.log(req.body.token)
        var data = JSON.parse(atob(token.split('.')[1]));
        console.log(data)
        try {
            const docs = ServiceModel.find({id:data.userID}, function (err, docs) {
                console.log(docs)
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

    static loadRequests = async (req, res) => {
        console.log(req.body)
        const token = req.body.token
        var data = JSON.parse(atob(token.split('.')[1]));

        try {
            const user = BookingModel.find({expertID:data.userID}, function (err, docs) {
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

    static booking = async (req,res) =>{
        const data = req.body.item
        const newStatus = req.body.newStatus
        try {
            BookingModel.findOneAndUpdate({_id: data._id }, 
                {status: newStatus}, function (err, docs) {
                if (err){
                    console.log(err)
                }
                else{
                    res.send({ "status": "success", message: "data updated successfully" })
                }
            });
        } catch (error) {
            res.send({ "status": "failed", message: "failed to save data" })
            
        }
    }
}

export default ExpertController