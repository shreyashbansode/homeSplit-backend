const model = require('./../models/userModal');
const nodemailer = require('nodemailer')


exports.createUser = async (req, res) => {
    try {
        const saveUser = await new model(req.body).save();
        if (saveUser) {
            res.send({
                success: true,
                message: 'User created successfully'
            })
        }
    } catch (err) {
        res.send({
            success: false,
            message: 'Failed to create user'
        })
    }
}

exports.getUser = async (req, res) => {
    try {
        const getUser = await model.findOne({ email: req.body.email });
        if (getUser) {
            const generateToken = await getUser.generateAuthToken();
            res.send({
                success: true,
                message: 'User login successfully',
                token: generateToken
            })
        }
    } catch (err) {
        console.log(err)
        res.status(500).send({
            success: false,
            message: 'Something went wrong'
        })
    }
}


exports.sendOtp = async (req, res) => {
    try {
        const { email } = req.body;
        let findUser = await model.findOne({ email: email });
        console.log(findUser)
        if (!findUser) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        const random = Math.floor(Math.random() * 9000 + 1000);
        findUser.otp = random;
        await findUser.save(); // Save the updated user object

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: "shreyashbansode01@gmail.com",
                pass: "zqhk ogue bikl fnqn",
            },
        });


        const gmailBody = ` Hello ${findUser.firstName}, 
                        For security reason ,you're required to use the following One TIme Password to login.
                       <h1> ${random}</h1>

 NOTE : this OTP is set to expire in 5 minutes.`

        const info = await transporter.sendMail({
            from: 'shreyashbansode01@gmail.com',
            to: "shreyashbansode1@gmail.com",
            subject: "OTP varifation",
            html: gmailBody,
        });

        res.status(200).json({
            success: true,
            message: "OTP successfully sent",
            otp: random,
            messageID: info.messageId,
        });


    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}


exports.varifyOtp = async (req, res) => {
    try {
        const { Otp } = req.body;
        let varifyUser = await model.find({ otp: Otp });

        const bodyTosend = {
            ...varifyUser,
            token: varifyUser?.token[varifyUser?.token?.length - 1]
        }
        if (varifyUser) {
            res.send({
                success: true,
                message: 'OTP successfully varify',
                data: varifyUser
            })
        }
    } catch (err) {
        console.log(err)
    }

}


exports.getUserList = async (req, res) => {
    try {
        const getList = await model.find();
        const responseToSend = [];
        getList?.forEach((item) => {
            responseToSend?.push({
                name: `${item.firstName} ${item.lastName}`,
                email: item.email
            })
        })
        if (getList) {
            res.send({
                success: true,
                message: 'Userlist successfully fetched',
                data: responseToSend
            })
        } else {
            res.send({
                success: false,
                message: 'Failed to fetched userlist'
            })
        }

    } catch (err) {
        res.send({
            success: false,
            message: 'Failed to fetched userlist'
        })
    }

}