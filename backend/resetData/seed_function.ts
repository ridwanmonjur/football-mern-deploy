const fs = require('fs');
import { Types } from 'mongoose'
var faker = require('faker');
const { hashSync } = require("bcrypt")
const saltRounds: number = 10
import { Product, ProductInterface } from '../models/Product'
import { Comment, CommentInterface } from '../models/Comment'
import { User, UserInterface } from '../models/User'
import { Cart, CartInterface } from '../models/Cart'
import { connectDB } from '../db'
import { winstonLogger } from '../winston/logger';
import * as dotenv from "dotenv"

dotenv.config({ path: '../config.env' })

interface ProductObject {
  name: string, price: number | string, productOwner: string, manufacturer: string, type: string, quantity: number,
}

function generateProductAd(productNameForAdd) {
  let productAd = "";
  if (productNameForAdd === "boots") {
    productAd = "Stylish boots| Great coomfort and support| Synthetic | Split grooves "
  }
  else if (productNameForAdd === "jerseys") {
    productAd = "Super-premium fabric| Lycra sleeves | Side Mesh | Silicon Elastic Bottom Grip| Customizable"
  }
  else {
    productAd = "Premium quality accessories| Exported from the best places"
  }
  return productAd
}


function readFiles(_fileName: string): Array<ProductInterface> {

  let JSONString = fs.readFileSync(`${__dirname}/${_fileName}.json`, 'utf-8')

  let JSONObject: Array<ProductObject> = JSON.parse(JSONString)

  return JSONObject.map((value: ProductObject) => {
    return {
      name: value['name'],
      manufacturer: value['productOwner'],
      type: _fileName,
      image: `assets/${_fileName}/${value['img']}`,
      stock: 20,
      description: generateProductAd(_fileName),
      price: Number(value['price'].toString().substring(1)),
      slug: faker.helpers.slugify(value.name)
      // no need to delete  val['productOwner']
    } as ProductInterface
  })
}

const importData = async () => {

  let loop: number = 0
  let users: Array<UserInterface> = []
  let carts: Array<CartInterface> = []
  //  1st 10 users are customers
  for (loop = 0; loop < 9; loop++) {
    users.push(new User({
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: hashSync("123456", saltRounds),
      role: "seller",
      address: {
        first: faker.address.streetAddress(),
        second: "London, UK"
      },
      creditCard: {
        number: faker.finance.creditCardNumber(),
        CVV: faker.finance.creditCardCVV()
      }
    })
    )
  }
  users.push(new User({
    name: "seller123",
    email: "ridwanmonjur@gmail.com",
    password: hashSync("123456", saltRounds),
    role: "seller"
  })
  )
  // 11th user is admin
  users.push(new User({
    name: "admin123",
    email: "mjrrdn@gmail.com",
    password: hashSync("123456", saltRounds),
    role: "admin"
  }))
  // 12th user is customer
  users.push(new User({
    name: "customer123",
    email: "mjrrdnasm@gmail.com",
    password: hashSync("123456", saltRounds),
    role: "customer"
  }))
  carts.push(new Cart({
    user: users[11]._id,
  })
  )
  // 13th-22th users are customers
  for (loop = 0; loop < 10; loop++) {
    users.push(new User({
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: hashSync("123456", saltRounds),
      role: "customer",
      address: {
        first: faker.address.streetAddress(),
        second: "London, UK"
      },
      creditCard: {
        number: faker.finance.creditCardNumber(),
        CVV: faker.finance.creditCardCVV()
      }
    })
    )
    carts.push(new Cart({
      user: users[loop]._id,
    })
    )
  }
  // 12th user customer123
  carts.push(new Cart({
    user: users[11]._id,
  })
  )

  try {
    users = await User.create(users)
    await Cart.create(carts)
  }
  catch {
    winstonLogger.error("error")
  }
  let JSONStringProducts: Array<ProductInterface> = [...readFiles("accessories"), ...readFiles("boots"), ...readFiles("jerseys")]

  JSONStringProducts.forEach(function (value) {

    let comments: Array<CommentInterface> = []
    for (loop = 0; loop < 5; loop++) {
      comments.push({
        userId: users[faker.datatype.number({ 'min': 14, 'max': 20 })]._id,
        comment: faker.commerce.productDescription()
      } as CommentInterface)
    }
    // 13th-22th users are customers
    value['seller'] = users[faker.datatype.number({ 'min': 13, 'max': 20 })]._id,
      value['comment'] = comments as Types.DocumentArray<CommentInterface>
  })
  try {
    await Product.create(JSONStringProducts)
    winstonLogger.info(JSONStringProducts)
    winstonLogger.info("Data imported.... ")
  } catch (err) {
    winstonLogger.error(err)
  }
};

export const resetProduct = async () => {

  await Product.deleteMany()

  const users = await User.find({ role: "customer" });

  // console.log({users: users})

  let JSONStringProducts: Array<ProductInterface> = await [...readFiles("accessories"), ...readFiles("boots"), ...readFiles("jerseys")]

  // console.log({JSONStringProducts})

  JSONStringProducts.forEach(function (value) {

    let comments: Array<CommentInterface> = []
    let loop: number = 0;
    for (loop = 0; loop < 5; loop++) {
      comments.push({
        userId: users[faker.datatype.number({ 'min': 0, 'max': 9 })]._id,
        comment: faker.commerce.productDescription()
      } as CommentInterface)
    }
    value['seller'] = users[faker.datatype.number({ 'min': 0, 'max': 8 })]._id,
      value['comment'] = comments as Types.DocumentArray<CommentInterface>
  })
  // console.log({JSONStringProducts})

  try {
    return await Product.create(JSONStringProducts)
  } catch (err) {
    winstonLogger.error(err)
  }
}

// Delete data
export const deleteData = async () => {
  try {
    await Product.deleteMany()
    await User.deleteMany()
    await Cart.deleteMany()
    winstonLogger.info('Data Destroyed...')
  } catch (err) {
    winstonLogger.error(err)
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
    const users = await User.find({})
    winstonLogger.info("Data replaced...")
    return users;
  } catch (err) {
    winstonLogger.error(err)
  }
}



