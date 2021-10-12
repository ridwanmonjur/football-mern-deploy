import { Request, Response, NextFunction } from 'express'
var jwt = require('jsonwebtoken');
const ObjectID = require("mongodb").ObjectID

// cannot bcrypt has no types so importing causes problem
const { hash, compare } = require("bcrypt")
/*
When a module is not yours - try to install types from @types:

npm install -D @types/module-name
If the above install errors - try changing import statements to require:

// import * as yourModuleName from 'module-name';
const yourModuleName = require('module-name');
*/
import { User, UserInterface } from "../models/User"    // need to specify the object imported from the module to use it later
import { rainbow, red, green } from 'colors'
import { Cart } from '../models/Cart';

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

        let user = await User.findById(ObjectID(req.newUser))
        res.json({ "success": true, user, userId: req.newUser })
    }
    catch (err) {
        res.json({ success: false, error: err })
    }
}

export async function editCurrentUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {

        let user: UserInterface | null = null;
        if (req.body.creditCardNumber !== undefined && req.body.addressFirst !== undefined) {
            user = await User.findByIdAndUpdate(ObjectID(req.newUser), {
                creditCardNumber: req.body.creditCardNumber,
                creditCardCVV: req.body.creditCardCVV,
                addressFirst: req.body.addressFirst,
                addressSecond: req.body.addressSecond
            })
            res.json({ "success": true, user, userId: req.newUser, number: 0 })
        }

        else if (req.body.creditCardNumber !== undefined && req.body.creditCardCVV !== undefined) {
            user = await User.findByIdAndUpdate(ObjectID(req.newUser), {
                creditCardNumber: req.body.creditCardNumber,
                creditCardCVV: req.body.creditCardCVV
            })
            res.json({ "success": true, user, userId: req.newUser, number: 1 })
        }
        else if (req.body.addressFirst !== undefined && req.body.addressSecond !== undefined) {
            console.log({ addressFirst: req.body.addressFirst, addressSecond: req.body.addressSecond })
            user = await User.findByIdAndUpdate(ObjectID(req.newUser), {
                addressFirst: req.body.addressFirst,
                addressSecond: req.body.addressSecond
            }, { new: true }
            )
            res.json({ "success": true, user, userId: req.newUser, number: 2 })
        }
        else if (req.body.addressFirst !== undefined && req.body.addressSecond !== undefined) {
            console.log({ addressFirst: req.body.addressFirst, addressSecond: req.body.addressSecond })
            user = await User.findByIdAndUpdate(ObjectID(req.newUser), {
                addressFirst: req.body.addressFirst,
                addressSecond: req.body.addressSecond
            }, { new: true }
            )
            res.json({ "success": true, user, userId: req.newUser, number: 2 })
        }
        else if (req.body.totalPurchase !== undefined) {
            user = await User.findByIdAndUpdate(ObjectID(req.newUser),
                {
                    totalPurchase: req.body.totalPurchase,
                },
                { new: true }
            )
            res.json({ "success": true, user, userId: req.newUser, number: 2 })
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

        console.log(rainbow(JSON.stringify(req.body)))

        // promise can be awaited !!!
        let hashedPassword = await hash(password, saltRounds)
        let newUser = new User({ name, email, password: hashedPassword, role: "buyer" })
        let cart = new Cart({ user: newUser._id, })
        await newUser.save()
        await cart.save()
        res.json({ newUser, success: true })
    }
    catch (err) {
        res.json({ success: false, error: err })

    }
}

export async function login(req: Request, res: Response, next: NextFunction): Promise<void> {

    try {
        let { email, password }: { email: string; password: string } = req.body

        // .select("+password") gets field select= false
        let newUser = await User.findOne({ email }).select("+password")

        console.log(rainbow(JSON.stringify(newUser)))

        if (newUser) {

            let match = false;
            match = await compare(password, newUser.password)

            if (match) {
                console.log(rainbow('success'))
                var jwt = require('jsonwebtoken');
                newUser._id = newUser._id.toString()
                var token = jwt.sign({ "newUser": newUser._id, "role": newUser.role }, JWT_SECRET)
                console.log({ token })
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
                        newUser
                    });
            }
            else {
                console.log("started")
                setTimeout(() => res.json({ success: false, error: "Password and username failed" }), 3000);
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