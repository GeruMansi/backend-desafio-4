const express = require('express')
const productsRouter = require('./productsRouter')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/productos', productsRouter)

app.use(express.static(`${__dirname}/public`))

const PORT = 8080

const server = app.listen(PORT, () => {
    console.log(`Servidor HTTP corriendo en puerto ${PORT}`)
})
server.on('error', error => console.log(`Error en el servidor: ${error}`))