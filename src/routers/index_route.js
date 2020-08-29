const express = require('express')

const router = express.Router();

route = router.get('/', (req, res, next) => {
    res.status(200).send({
        //200 - OK
        title: "System Begin",
        version: "0.0.1"
    })
})


module.exports = route;