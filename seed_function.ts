const fs = require('fs');
import { Schema, model, Document, Types } from 'mongoose'
const colors = require('colors');
var faker = require('faker');
const { hashSync } = require("bcrypt")
const saltRounds: number = 10

import { Product, ProductInterface, Comment, CommentInterface } from './models/Product'
import { User, UserInterface } from './models/User'
import { Cart, CartInterface } from './models/Cart'


import { connectDB } from './db'
interface ProductObject {
  name: string, price: number | string, productOwner: string, manufacturer: string, type: string, quantity: number,
}

// Read JSON files: NOT ASYNC IF CALL ASYNC PROBLEM
function readFiles(fileName_: string): Array<ProductInterface> {
  // get JSON string
  let JSONString = fs.readFileSync(`${__dirname}/json/${fileName_}.json`, 'utf-8')

  let JSONObject: Array<ProductObject> = JSON.parse(JSONString)

  return JSONObject.map((value: ProductObject, index: number) => {
    return {
      name: value['name'],
      manufacturer: value['productOwner'],
      type: fileName_,
      image: `image${index}.jpg`,
      stock: 20,
      price: Number(value['price'].toString().substring(1)),
      slug: faker.helpers.slugify(value.name)
      // no need to delete  val['productOwner']
    } as ProductInterface
  })
}
/*
    user: PopulatedDoc<UserInterface>,
    products: [
        {
            quantity: number,
            productDetails: PopulatedDoc<ProductInterface>
        },
    ],
    paid: boolean,
    total: number
*/
// Import into DB
const importData = async () => {
  // not async connectDB
  // not async readfiles
  // await readFiles("accessories")

  let loop: number = 0

  let users: Array<UserInterface> = []
  let carts: Array<CartInterface> = []

  for (loop = 0; loop < 10; loop++) {
    users.push(new User({
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: hashSync("123456", saltRounds),
      role: "Buyer",
      addressFirst: faker.address.streetAddress(),
      addressSecond:  "London, UK",
      creditCardNumber: faker.finance.creditCardNumber(),
      creditCardCVV: faker.finance.creditCardCVV()
    })
    )
    carts.push(new Cart({
      user: users[loop]._id,
    })
    )

  }

  users.push(new User({
    name: "admin",
    email: "Admin@gmail.com",
    password: hashSync("123456", saltRounds),
    role: "admin"
  }))

  try{
  await User.create(users)
  await Cart.create(carts)
  }
  catch{
    console.log("error")
  }
  let JSONStringToObject: Array<ProductInterface> = [...readFiles("accessories"), ...readFiles("boots"), ...readFiles("jerseys")]

  JSONStringToObject.forEach(function (value) {

    let comments: Array<CommentInterface> = []
    for (loop = 0; loop < 5; loop++) {
      comments.push({
        userId: users[faker.datatype.number({ 'min': 0, 'max': 9 })]._id,
        comment: faker.commerce.productDescription()
      } as CommentInterface)
    }
    value['comment'] = comments as Types.DocumentArray<CommentInterface>
  })
  try {
    await Product.create(JSONStringToObject)


    console.log(colors.green.inverse('Data Imported...'))

  } catch (err) {
    console.error(err)
  }
};

// Delete data
const deleteData = async () => {
  try {
    await Product.deleteMany()
    await User.deleteMany()
    await Cart.deleteMany()
    console.log(colors.red.inverse('Data Destroyed...'))
  } catch (err) {
    console.error(err)
  }
}

connectDB()

if (process.argv[2] === '-i') {
  importData()
} else if (process.argv[2] === '-d') {
  deleteData()
}

export const resetData = async () => {
  try {
    await deleteData()
    await importData()
    console.log(colors.red.inverse('Data Replaced...'))
    // process.exit()
  } catch (err) {
    console.error(err)
  }
}



