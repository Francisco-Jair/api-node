
const mongoose = require('mongoose');
const Product = mongoose.model('Product')

exports.get = (req, res, next) => {
    Product.find({ active: true }, 'titles price slug').then(data => {
        res.status(200).send(data);
    }).catch(err => {
        res.status(400).send(err);
    })
}

exports.getBySlug = (req, res, next) => {
    Product.find({ slug: req.params.slug, active: true }, 'titles description price slug tags').then(data => {
        res.status(200).send(data);
    }).catch(err => {
        res.status(400).send(err);
    })
}

exports.getById = (req, res, next) => {
    Product.findById(req.params.id).then(data => {
        res.status(200).send(data);
    }).catch(err => {
        res.status(400).send(err);
    })
}

exports.getByTag = (req, res, next) => {
    Product.find({ tags: req.params.tag, active: true }, 'titles description price slug tags').then(data => {
        res.status(200).send(data);
    }).catch(err => {
        res.status(400).send(err);
    })
}

exports.post = (req, res, next) => {
    var product = new Product(req.body)
    product.save().then(x => {
        res.status(201).send({ message: "Produto cadastrado com sucesso" });
    }).catch(err => {
        res.status(400).send({ message: "Falha ao cadastrar o produto", data: err });
    })
}

exports.put = (req, res, next) => {
    Product.findByIdAndUpdate(req.params.id, {
        $set: {
            titles: req.body.titles,
            description: req.body.description,
            price: req.body.price,
            slug: req.body.slug,
        }
    }).then((x) => {
        res.status(201).send({ message: "Produto atualizado com sucesso!" })
    }).catch(e => {
        res.status(400).send({
            message: "Falha na atualização do produto",
            data: e
        })
    })
}

exports.delete = (req, res, next) => {
    Product.findOneAndRemove(req.body.id).then((x) => {
        res.status(201).send({ message: "Produto removido com sucesso!" })
    }).catch(e => {
        res.status(400).send({
            message: "Falha na remoção do produto",
            data: e
        })
    })
}
