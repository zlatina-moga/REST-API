const {Schema, model} = require('mongoose')

//adjust to project requirements
const schema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    imageUrl: {type: String, required: true, match:[/^https?/, 'Image must be valid URL']},
    owner: {type: Schema.Types.ObjectId, ref: 'User'}
})

module.exports = model('Item', schema)
