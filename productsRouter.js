const { Router } = require('express')

const products = []

const productsRouter = Router()

// ===== ENDPOINT TODOS LOS PRODUCTOS =====
productsRouter.get('', (req, res) => {
    console.log('Petición recibida')

    return res.json(products)
})

// ===== ENDPOINT PRODUCTOS POR ID =====
productsRouter.get('/:id', (req, res) => {
    console.log('Petición recibida')

    const id = Number(req.params.id)

    const product = products.find(item => item.id === id)

    if (!product) {
        return res.status(404).json({
            error: 'Producto no encontrado'
        })
    }

    return res.json(product)
})

// ===== ENDPOINT AGREGAR PRODUCTO =====
productsRouter.post('', (req, res) => {
    console.log('Petición POST recibida')

    const newProduct = req.body

    newProduct.id = products.length + 1

    products.push(newProduct)

    return res.status(201).json(newProduct)
})

// ===== ENDPOINT MODIFICAR PRODUCTO =====
productsRouter.put('/:id', (req, res) => {
    console.log('Petición PUT recibida')

    const id = Number(req.params.id)

    const productIndex = products.findIndex(item => item.id === id)

    if (productIndex === -1) {
        return res.status(404).json({
            error: 'Producto no encontrado'
        })
    }

    products[productIndex].title = req.body.title
    products[productIndex].price = req.body.price
    products[productIndex].thumbnail = req.body.thumbnail

    return res.json(products[productIndex])
})

//===== ENDPOINT ELIMINAR PRODUCTO =====
productsRouter.delete('/:id', (req, res) => {
    console.log('Petición DELETE recibida')

    const id = Number(req.params.id)
    const productIndex = products.findIndex(item => item.id === id)

    products = products.filter(item => item.id !== id)

    return res.status(204).json({})
})

module.exports = productsRouter