const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')


//Conectar ao banco de dados
mongoose.connect("mongodb+srv://teste:k9mCM97Pg8cu49uR@aprendendo.opjsn.mongodb.net/aprendendo?retryWrites=true&w=majority", {
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

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', index)
app.use('/products', product)


module.exports = app