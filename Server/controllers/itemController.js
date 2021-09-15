const router = require('express').Router();
const {isAuth, isOwner} = require('../middlewares/guards')
const preload = require('../middlewares/preload')

router.get('/', async (req, res) => {
   const items = await req.storage.getAll();
   res.json(items)
})

router.post('/', isAuth(), async (req, res) => {
    //adjust to project schema requirements
    const data = {
        title: req.body.title,
        description: req.body.description,
        price: Number(req.body.price),
        imageUrl: req.body.imageUrl,
        owner: req.user._id
    }
    try {
        const result = await req.storage.create(data)
        res.status(201).json(result)
    } catch (err) {
        res.status(err.status || 400).json({message: err.message})
    }
})

router.get('/:id', preload(), async (req, res) => {
    const item = req.data.toObject();
   res.json(item)
})

router.put('/:id', isAuth(), preload(), isOwner(), async (req, res) => {
    const updated = {
        title: req.body.title,
        description: req.body.description,
        price: Number(req.body.price),
        imageUrl: req.body.imageUrl
    }

    try {
        const result = await req.storage.update(req.data, updated)
        res.json(result)
    } catch (err) {
        res.status(err.status || 400).json({message: err.message})
    }
})

router.delete('/:id', isAuth(), preload(), isOwner(), async (req, res) => {
    try {
        await req.storage.remove(req.params.id)
        res.status(204).end()
    } catch (err) {
        res.status(err.status || 400).json({message: err.message})
    }
})

module.exports = router;