import express from 'express'
import cors from 'cors'
import userRouter from './app/server/routes/user.routes.js'

const app = express()
const port = 3000

//habilitamos CORS para permitir solicitudes desde el front-end
app.use(cors())

//habilitamos el parseo de JSON en las solicitudes entrantes
app.use(express.json())

/*Para levantar nuestro front*/
app.use(express.static('./app/server'))

/*Rutas de END-POINT*/
app.use('/user', userRouter)

//levantamos el servidor
app.listen(port, () => {
    console.log(`Servidor levantado en el puerto ${port}`)  // ← backticks, no comillas simples
})