
const mongoose = require('mongoose');
const Product = mongoose.model('Product')
const ValidationContract = require('../validators/fluent-validator')
const repository = require('../repositorios/product_repositorio')

exports.get = (req, res, next) => {
    repository.get().then(data => {
        res.status(200).send(data);
    }).catch(err => {
        res.status(400).send(err);
    })
}

exports.getBySlug = (req, res, next) => {
    repository.getBySlug(req.params.slug).then(data => {
        res.status(200).send(data);
    }).catch(err => {
        res.status(400).send(err);
    })
}

exports.getById = (req, res, next) => {
    repository.getById(req.params.id).then(data => {
        res.status(200).send(data);
    }).catch(err => {
        res.status(400).send(err);
    })
}

exports.getByTag = (req, res, next) => {
    repository.getByTag(req.params.tag).then(data => {
        res.status(200).send(data);
    }).catch(err => {
        res.status(400).send(err);
    })
}

exports.post = (req, res, next) => {
    let contract = new ValidationContract()
    contract.hasMinLen(req.body.titles, 3, 'O título deve conter pelo menos 3 caracteres')
    contract.hasMinLen(req.body.slug, 3, 'O título deve conter pelo menos 3 caracteres')
    contract.hasMinLen(req.body.description, 3, 'O título deve conter pelo menos 3 caracteres')

    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end()
        return
    }

    repository.create(req.body).then(x => {
        res.status(201).send({ message: "Produto cadastrado com sucesso" });
    }).catch(err => {
        res.status(400).send({ message: "Falha ao cadastrar o produto", data: err });
    })
}

exports.put = (req, res, next) => {
    repository.update(req.params.id, req.body).then((x) => {
        res.status(201).send({ message: "Produto atualizado com sucesso!" })
    }).catch(e => {
        res.status(400).send({
            message: "Falha na atualização do produto",
            data: e
        })
    })
}

exports.delete = (req, res, next) => {
    repository.remove(req.body.id).then((x) => {
        res.status(201).send({ message: "Produto removido com sucesso!" })
    }).catch(e => {
        res.status(400).send({
            message: "Falha na remoção do produto",
            data: e
        })
    })
}
