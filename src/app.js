const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const config = require('./config')


//Conectar ao banco de dados
mongoose.connect(config.connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

//Carregando os models
const Product = require('./models/products')
const Customer = require('./models/customer')
const Order = require('./models/order')

//Carregando as rotas
const index = require('./routers/index_route')
const product = require('./routers/product_route')
const customer = require('./routers/customer_route')

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', index)
app.use('/products', product)
app.use('/customers', customer)


module.exports = app