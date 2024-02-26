require('dotenv').config()
const connectDB = require('./db/connect')
const Product = require('./models/product')

const jsonProdcuts = require('./products.json')

const start = async ()=>{
    try {
        await connectDB(process.env.Mongo_URL)
        await Product.deleteMany()
        await Product.create(jsonProdcuts)
        console.log('success')
        process.exit(0)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

start()