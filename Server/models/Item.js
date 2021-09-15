const {Schema, model} = require('mongoose')

//adjust to project requirements
const schema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    owner: {type: Schema.Types.ObjectId, ref: 'User'}
})

module.exports = model('Item', schema)