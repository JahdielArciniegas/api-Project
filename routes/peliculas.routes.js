import { Router } from "express";
import { conexion } from "../db.js";
const router = Router()

router.get ('/obtener_peliculas', (req,res) => {
    const consulta = 'SELECT * FROM peliculas';
    conexion.query(consulta, function(error,resultado){
        if(error){
            res.status(500).json({error: 'Error al obtener registros'});
        }else{
            res.json(resultado)
        }
    })
})

export default router;