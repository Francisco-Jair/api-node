const mongoose = require('mongoose');
const Product = mongoose.model('Product')
const ValidationContract = require('../validators/fluent-validator')
const repository = require('../repositorios/product_repositorio')

exports.get = async (req, res, next) => {
    try {
        var data = await repository.get()
        res.status(200).send(data)
    } catch (e) {
        res.status(500).send({ message: 'Falha ao processar sua requisição' })
    }
}

exports.getBySlug = async (req, res, next) => {
    try {
        var data = await repository.getBySlug(req.params.slug)
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({ message: 'Falha ao processar sua requisição' })
    }
}

exports.getById = async (req, res, next) => {
    try {
        var data = await repository.getById(req.params.id)
        res.status(200).send(data);
    } catch (error) {
        res.status(400).send(error);
    }
}

exports.getByTag = async (req, res, next) => {
    try {
        const data = await repository.getByTag(req.params.tag)
        res.status(200).send(data);
    } catch (error) {
        res.status(400).send(error);
    }
}

exports.post = async (req, res, next) => {
    let contract = new ValidationContract()
    contract.hasMinLen(req.body.titles, 3, 'O título deve conter pelo menos 3 caracteres')
    contract.hasMinLen(req.body.slug, 3, 'O título deve conter pelo menos 3 caracteres')
    contract.hasMinLen(req.body.description, 3, 'O título deve conter pelo menos 3 caracteres')

    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end()
        return
    }

    try {
        await repository.create(req.body)
        res.status(201).send({ message: "Produto cadastrado com sucesso" });
    } catch (error) {
        res.status(500).send({ message: 'Falha ao processar sua requisição' })
    }

}

exports.put = async (req, res, next) => {

    try {
        await repository.update(req.params.id, req.body)
        res.status(201).send({ message: "Produto atualizado com sucesso!" })
    } catch (error) {
        res.status(500).send({ message: 'Falha ao processar sua requisição' })
    }
}

exports.delete = async (req, res, next) => {
    try {
        await repository.remove(req.body.id)
        res.status(201).send({ message: "Produto removido com sucesso!" })
    } catch (error) {
        res.status(500).send({ message: 'Falha ao processar sua requisição' })
    }

}
