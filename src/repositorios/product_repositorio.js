const mongoose = require('mongoose')
const Product = mongoose.model('Product')


exports.get = async () => {
    const res = await Product.find({
        active: true
    }, 'Title price slug')

    return res
}

exports.getBySlug = async (slug) => {
    const res = await Product.find({ slug: slug, active: true }, 'titles description price slug tags')
    return res
}

exports.getById = async (id) => {
    const res = await Product.findById(id)
    return res
}

exports.getByTag = async (tag) => {
    const res = Product.find({ tags: tag, active: true }, 'titles description price slug tags')
    return res
}

exports.create = async (data) => {
    var product = new Product(data)
    await product.save()
}

exports.update = async (id, data) => {
    const res = await Product.findByIdAndUpdate(id, {
        $set: {
            titles: data.titles,
            description: data.description,
            price: data.price,
            slug: data.slug,
        }
    })
}

exports.remove = async (id) => {
    await Product.findOneAndRemove(id)
}