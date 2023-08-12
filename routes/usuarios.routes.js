import { Router } from "express";
import { conexion } from "../db.js";
const router = Router()

router.get ('/obtener_usuarios', (req,res) => {
    const consulta = 'SELECT * FROM usuarios';
    conexion.query(consulta, function(error,resultado){
        if(error){
            res.status(500).json({error: 'Error al obtener registros'});
        }else{
            res.json(resultado)
        }
    })
})

export default router;