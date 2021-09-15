const Item = require('../models/Item')

async function getAll() {
    return await Item.find({}).lean()
}

async function getById(id) {
    return await Item.findById(id).lean(
}

async function create(data) {
    const result = new Item(data);
    await result.save()
    return result;
}

async function update(original, updated) {
    Object.assign(original, updated)
    await original.save()
    return original;
}

async function remove(id){
    return Item.findByIdAndDelete(id)
}

module.exports = {
    getAll,
    getById,
    create, 
    update,
    remove
}
