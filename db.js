import mysql from 'mysql'
import express from 'express'
import cors from 'cors'
import usuariosRoutes from './routes/usuarios.routes.js'
import peliculasRoutes from './routes/peliculas.routes.js'
import seriesRoutes from './routes/series.routes.js'
import criticaPRoutes from './routes/criticaP.routes.js'
import criticaSRoutes from './routes/criticaS.routes.js'
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_USER, PORT } from './config.js'

const app = express()

app.use(express.json())

app.use(cors());

app.listen(PORT, () => {
    console.log(`Servidor exitosamente creado http://localhost:${PORT}`)
})

export const conexion = mysql.createConnection({
    host: DB_HOST,
    database: DB_NAME,
    user: DB_USER,
    password: DB_PASSWORD
})

conexion.connect(function(error){
    if(error){
        throw error;
    }else{
        console.log('CONEXION EXITOSA');
    }
})

app.use(usuariosRoutes)
app.use(peliculasRoutes)
app.use(seriesRoutes)
app.use(criticaPRoutes)
app.use(criticaSRoutes)







