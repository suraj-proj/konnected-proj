const db = require('../utils/db').pool;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const nodemailer = require('nodemailer');
const randomstring = require('randomstring');

const securePassword = async (password) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const passwordHash = await bcrypt.hashSync(password, salt);
        return passwordHash;
    } catch (error) {
        console.log(error.message);
    }
}

const sendAccountActivationMail = async (name, email, activate_token) => {
    try {
        const transport = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: process.env.emailUser,
                pass: process.env.emailPassword
            }
        });

        const mailOptions = {
            from: process.env.emailUser,
            to: email,
            subject: 'Activate your KonnectEd Password',
            html: '<p>Hello ' + name + ',<br/>Please click here to <a href="http://127.0.0.1:3000/auth/activate-account?activate_token=' + activate_token + '">Activate your Account</a>.'
        }

        transport.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            }
            else {
                console.log("Activation email is sent:- ", info.response);
            }
        })

    } catch (error) {
        console.log(error.message);
    }
}

const sendResetPasswordMail = async (name, email, reset_token) => {
    try {
        const transport = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: process.env.emailUser,
                pass: process.env.emailPassword
            }
        });

        const mailOptions = {
            from: process.env.emailUser,
            to: email,
            subject: 'Reset your KonnectEd Password',
            html: '<p>Hello ' + name + ',<br/>Your reset code is: ' + reset_token + '.'
        }

        transport.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            }
            else {
                console.log("Reset email is sent:- ", info.response);
            }
        })

    } catch (error) {
        console.log(error.message);
    }
}

const loadActivateAccount = async (req, res) => {
    try {
        const activate_token = req.query.activate_token;
        console.log(activate_token);

        const q = `SELECT * FROM users WHERE activate_token = '${activate_token}';`;

        console.log(q);
        db.query(q, (err, data) => {
            if (err) return res.status(409).json(err.message);
            if (data.rows.length == 0) return res.status(404).json("Error when activating. Please Check your link!");

            const q = `UPDATE users SET is_activated = '1', activate_token = '' WHERE activate_token = '${activate_token}';`

            db.query(q, (err, data) => {
                if (err) return res.json(err.message);
                console.log("Activated!");
                res.status(200).json("Account Activated!");
            })
        });

        // const activateTokenData = await User.findOne({ activate_token: activate_token });

        // if (activateTokenData) {
        //     await User.findByIdAndUpdate({ _id: activateTokenData._id }, { $set: { is_activated: 1, activate_token: '' } });
        //     res.render('auths/user-registered', { message: 'activated successfully. You can now login your account and access to your dashboard.' });
        // }
        // else {
        //     res.render('404');
        // }
    } catch (error) {
        console.log(error.message);
    }
}
const resetPassword = async (req, res) => {
    try {
        console.log("Here! I am! Here!");
        const email = req.body.email ? req.body.email : '';
        const code = req.body.code;
        const password = req.body.password;

        if (code == '') {
            const q = `SELECT * FROM users
            WHERE email = '${email}';`

            console.log(q);
            db.query(q, (err, data) => {
                if (err) return res.status(409).json(err.message);
                if (data.rows.length == 0) return res.status(404).json("User not found! Please check your email!");

                const name = data.rows[0].name;
                const username = data.rows[0].username;
                const randomString = randomstring.generate(4);

                const q = `UPDATE users SET reset_token = '${randomString}' 
                    WHERE email = '${email}' 
                    AND username = '${username}';`

                db.query(q, (err, data) => {
                    if (err) return res.json(err.message);
                    sendResetPasswordMail(name, email, randomString).then(() => {
                        console.log("Sent Reset Message!");
                        return res.status(200).json("Reset message has been sent!");
                    }).catch((err) => {
                        return res.status(500).json(err.message);
                    });
                })
            })
        } else {
            const q = `SELECT * FROM users
            WHERE email = '${email}' AND reset_token = '${code}';`
            db.query(q, async (err,data)=>{
                if (err) return res.json(err.message);
                if (data.rows.length == 0) return res.status(404).json("Incorrect Reset Code or Email Address!");

                const username = data.rows[0].username;
                const hashedPassword = await securePassword(password);

                const q = `UPDATE users SET 
                    password = '${hashedPassword}', reset_token = '' 
                    WHERE email = '${email}' 
                    AND username = '${username}';`

                console.log(q);

                db.query(q, (err, data) => {
                    if (err) return res.json(err.message);
                    console.log("Password has been changed!");
                    res.status(200).json("Your password has been changed.");
                })
            })
        }
    } catch (error) {
        console.log(error.message);
    }
}


// const jwtGenerator = (user_id) => {
//     console.log(process.env.TOKEN_SECRET);
//     const payload = {
//         user: {
//             id: user_id
//         }
//     };
//     return jwt.sign(payload, process.env.TOKEN_SECRET, {expiresIn: "7d"});
// }

const register = (req, res) => {
    // Check existing user
    const { name, username, email, password } = req.body;
    const q = `SELECT * FROM users
        WHERE (username = '${username}')
        OR (email = '${email}');`
    console.log(q);
    db.query(q, async (err, data) => {
        if (err) return res.json(err.message);
        if (data.rows.length > 0) return res.status(409).json("User already exists! Please Choose another username or email!");

        // Hash the psw and create usr
        const hashedPassword = await securePassword(password);
        const randomString = randomstring.generate();

        const q = `INSERT INTO users(name,username,email,password,rank,level,activate_token) VALUES (
            '${name}',
            '${username}',
            '${email}',
            '${hashedPassword}',
            1,
            12,
            '${randomString}'
            );`;
        console.log(q);
        db.query(q, (err, data) => {
            if (err) return res.json(err.message);

            sendAccountActivationMail(name, email, randomString).then(() => {
                return res.status(200).json("User has been Created!");
            }).catch((err) => {
                return res.status(500).json(err.message);
            });
        });
    });
}

const login = (req, res) => {
    // check user
    const { username, email } = req.body;
    const q = `SELECT * FROM users
        WHERE (username = '${username}');`
    console.log(q);
    db.query(q, (err, data) => {
        if (err) return res.json(err.message);
        if (data.rows.length == 0) return res.status(404).json("Incorrect username or password!");
        // Check the psw
        const isPswCorrect = bcrypt.compareSync(req.body.password, data.rows[0].password);

        if (!isPswCorrect) return res.status(400).json("Incorrect username or password!");

        if (!data.rows[0].is_activated) return res.status(400).json("Please activate your account through mail!");
        console.log("Is Activated: " + data.rows[0].is_activated);

        // return res.status(500).json("Process in Development Here!");

        const token = jwt.sign({ id: data.rows[0].id }, "jwtkey");
        const { password, ...other } = data.rows[0];

        req.session.token = token;
        req.session.save();
        console.log(req.session.token);
        console.log("Session Id: " + req.session.id);
        res.status(200).json(other);
    });
}

const logout = (req, res) => {
    console.log("Logout")
}

module.exports = {
    register,
    login,
    logout,
    loadActivateAccount,
    resetPassword
}