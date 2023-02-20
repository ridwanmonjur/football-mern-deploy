import { Request, Response, NextFunction } from 'express'
var jwt = require('jsonwebtoken');
const ObjectID = require("mongodb").ObjectID
const { hash, compare } = require("bcrypt")
import { User, UserInterface } from "../models/User"    // need to specify the object imported from the module to use it later
// import { rainbow, red, green } from 'colors'
import { Cart } from '../models/Cart';
import { winstonLogger } from '../winston/logger';
let JWT_SECRET = 'secret'

export async function sayHi(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {

        res.json({ "success": true })
    }
    catch (err) {
        res.json({ success: false, error: err })
    }
}

export async function getUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {

        let user = await User.findById(req.params.userId)
        res.json({ "success": true, user })
    }
    catch (err) {
        res.json({ success: false, error: err })
    }
}

export async function getCurrentUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {

        let user = await User.findById(ObjectID(req.user))
        res.json({ "success": true, user, userId: req.user })
    }
    catch (err) {
        res.json({ success: false, error: err })
    }
}

export async function editCurrentUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {

        let user: UserInterface | null = null;
        if (req.body.creditCardNumber !== undefined && req.body.addressFirst !== undefined) {
            user = await User.findByIdAndUpdate(ObjectID(req.user), {
                creditCardNumber: req.body.creditCardNumber,
                creditCardCVV: req.body.creditCardCVV,
                addressFirst: req.body.addressFirst,
                addressSecond: req.body.addressSecond
            })
            res.json({ "success": true, user, userId: req.user, number: 0 })
        }

        else if (req.body.creditCardNumber !== undefined && req.body.creditCardCVV !== undefined) {
            user = await User.findByIdAndUpdate(ObjectID(req.user), {
                creditCardNumber: req.body.creditCardNumber,
                creditCardCVV: req.body.creditCardCVV
            })
            res.json({ "success": true, user, userId: req.user, number: 1 })
        }
        else if (req.body.addressFirst !== undefined && req.body.addressSecond !== undefined) {
            winstonLogger.info({ addressFirst: req.body.addressFirst, addressSecond: req.body.addressSecond })
            user = await User.findByIdAndUpdate(ObjectID(req.user), {
                addressFirst: req.body.addressFirst,
                addressSecond: req.body.addressSecond
            }, { new: true }
            )
            res.json({ "success": true, user, userId: req.user, number: 2 })
        }
        else if (req.body.addressFirst !== undefined && req.body.addressSecond !== undefined) {
            winstonLogger.info({ addressFirst: req.body.addressFirst, addressSecond: req.body.addressSecond })
            user = await User.findByIdAndUpdate(ObjectID(req.user), {
                addressFirst: req.body.addressFirst,
                addressSecond: req.body.addressSecond
            }, { new: true }
            )
            res.json({ "success": true, user, userId: req.user, number: 2 })
        }
        else if (req.body.totalPurchase !== undefined) {
            user = await User.findByIdAndUpdate(ObjectID(req.user),
                {
                    totalPurchase: req.body.totalPurchase,
                },
                { new: true }
            )
            res.json({ "success": true, user, userId: req.user, number: 2 })
        }
        else {
            res.json({ "success": false, user, message: "Empty Body!" })
        }
    }
    catch (err) {
        res.json({ success: false, error: err })
    }

}



export async function getUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {

        let users = await User.find({})
        res.json({ "success": true, users })
    }
    catch (err) {
        res.json({ success: false, error: err })
    }
}

export async function signup(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {

        const saltRounds: number = 10

        let { name, email, password }: { name: string; email: string; password: string } = req.body

        winstonLogger.info(JSON.stringify(req.body))

        // promise can be awaited !!!
        let hashedPassword = await hash(password, saltRounds)
        let user = new User({ name, email, password: hashedPassword, role: "buyer" })
        let cart = new Cart({ user: user._id, })
        await user.save()
        await cart.save()
        res.json({ user, success: true })
    }
    catch (err) {
        res.json({ success: false, error: err })

    }
}

export async function login(req: Request, res: Response, next: NextFunction): Promise<void> {

    try {
        let { email, password }: { email: string; password: string } = req.body

        // .select("+password") gets field select= false
        let user = await User.findOne({ email }).select("+password")

        winstonLogger.info(JSON.stringify(user))

        if (user) {

            let match = false;
            match = await compare(password, user.password)

            if (match) {
                winstonLogger.info('success')
                user._id = user._id.toString()
                var token = jwt.sign({ "user": user._id, "role": user.role }, JWT_SECRET)
                winstonLogger.info({ token })
                const options = {
                    expires: new Date(
                        Date.now() + 30 * 24 * 60 * 60 * 1000
                        // 30 days
                    ),
                    httpOnly: true
                };

                res
                    .cookie('signInToken', token, options)
                    .json({
                        success: true,
                        token,
                        user
                    });
            }
            else {
                winstonLogger.info("started")
                setTimeout(() => res.json({ success: false, error: "Time out happened" }), 9000);
            }
        }
        else
            res.json({ success: false, error: "Password and username failed" })
    }
    catch (err) {
        res.json({ success: false, error: err })

    }
}


/*

interface Dog {
  name: string
  age: number
}

const dog: Dog = body.value

*/