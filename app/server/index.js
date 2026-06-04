import express from 'express'
import cors from 'cors'
import userRouter from './routes/user.routes.js'
import ProductsRoutes from './routes/product.routes.js'
import CategoryRoutes from './routes/category.routes.js'
import 'dotenv/config'

const app = express()

//habilitamos el parseo de JSON en las solicitudes entrantes
app.use(express.json())

const port = process.env.PORT || 3000

//habilitamos CORS para permitir solicitudes desde el front-end
app.use(cors())

/*Para levantar nuestro front*/
app.use(express.static('./app/server'))

/*Rutas de END-POINT*/
app.use('/user', userRouter)
app.use('/product', ProductsRoutes)
app.use('/category', CategoryRoutes)

//levantamos el servidor
app.listen(port, () => {
    console.log(`Servidor levantado en el puerto ${port}`)  // ← backticks, no comillas simples
})