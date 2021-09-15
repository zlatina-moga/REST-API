const itemService = require('../services/itemService');

module.exports = () => (req, res, next) => {
    req.storage = {
        ...itemService
    }
    next()
}