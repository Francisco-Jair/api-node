const mongoose = require('mongoose')
const Product = mongoose.model('Product')


exports.get = () => {
    return Product.find({
        active: true
    }, 'Title price slug')
}

exports.getBySlug = (slug) => {
    return Product.find({ slug: slug, active: true }, 'titles description price slug tags')
}

exports.getById = (id) => {
    return Product.findById(id)
}

exports.getByTag = (tag) => {
    return Product.find({ tags: tag, active: true }, 'titles description price slug tags')
}

exports.create = (data) => {
    var product = new Product(data)
    return product.save()
}

exports.update = (id, data) => {
    return Product.findByIdAndUpdate(id, {
        $set: {
            titles: data.titles,
            description: data.description,
            price: data.price,
            slug: data.slug,
        }
    })
}

exports.remove = (id) => {
    return Product.findOneAndRemove(id)
}