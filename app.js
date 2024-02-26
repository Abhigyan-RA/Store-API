require('dotenv').config()
//async errors
require('express-async-errors')
const express = require('express')
const app = express()
const connectDB = require('./db/connect')
const productsRouter = require('./routes/product')
const notFoundMidlleware = require('./middleware/not-found')
const errorMidlleware = require('./middleware/error-handler')

//middleware
app.use(express.json())

//routes
app.get('/',(req,res)=>{
    res.send('<h1>Store API</h1><a href="/api/v1/products">products route</a>')
})

//products routes
app.use('/api/v1/products',productsRouter)



app.use(notFoundMidlleware)
app.use(errorMidlleware)
const port = process.env.PORT || 3000;
const start = async ()=>{
    try {
        await connectDB(process.env.Mongo_URL)
        app.listen(port,console.log(`Server is listening at ${port}...`))
    } catch (error) {
        console.log(error)
    }
}
start()