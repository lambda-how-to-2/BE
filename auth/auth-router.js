require('dotenv').config()
const bcrypt = require('bcryptjs')
const router = require('express').Router()
const authdb = require('./auth-model.js')
const jwt = require('jsonwebtoken')
const authmw = require('./auth-middleware')

router.get('/', (req, res) => {
    res.status(200).json({message:'Authentication router is live'})
})

router.get("/users", authmw.loginValid('normal'), async (req, res, next) => {
    try {
        res.json(await authdb.find())
    } catch(err) {
        next(err)
    }
})

router.post('/register', authmw.regValid, async (req, res, next) => {
    try{
        const {email, password} = req.body
        const newUser = await authdb.addUser({
            email,
            password: await bcrypt.hash(password, 16)
        })
        res.status(201).json(newUser)
    } catch (e) {
        next(e)
    }
});

router.post('/login', async (req, res, next) => {
    try {
        const { email, password } = req.body
        const user = await authdb.findByUsername({ email }).first()

        if (!user) {
            return res.status(400).json({
                message: "Invalid Credentials",
            })
        }

        const passwordValid = await bcrypt.compare(password, user.password)

        if (!passwordValid) {
            return res.status(400).json({
                message: "Invalid Credentials",
            })
        }

        const payload = {
            userId: user.id,
            email: user.email,
            userRole: "normal"
        }

        // res.cookie("token", jwt.sign(payload, process.env.JWT_SECRET))
        const token = jwt.sign(payload, process.env.JWT_SECRET)
        res.json({
            message: `Welcome ${user.email}!`,
            token: token //included for testing purposes only
        })
    } catch (e) {
        next(e)
    }
});

module.exports = router;
