import { Router } from "express";
import { conexion } from "../db.js";


const router = Router()

router.get ('/obtener_criticaS', (req,res) => {
    const consulta = 'SELECT * FROM critica_serie';
    conexion.query(consulta,function(error,resultado){
        if(error){
            res.status(500).json({error: 'Error al obtener registros'});
        }else{
            res.json(resultado)
        }
    })
})

router.post('/enviar_criticaS', (req, res) => {
    const recibidaidSerie = req.body.serie;
    const recibidaidUser = req.body.user;
    const puntajeCritica = req.body.points
    const opinionCritica = req.body.opinion
    
    conexion.query('SELECT * FROM critica_serie WHERE usuario_id = ? AND serie_id = ?', [recibidaidUser , recibidaidSerie], (error,results) =>{
        if(error){
            console.log(error);
        }else{
            if(results.length > 0){
                conexion.query('UPDATE critica_serie SET puntaje_criticaS = ?, opinion_criticaS = ? WHERE usuario_id=? AND serie_id=?',
                [puntajeCritica,opinionCritica,recibidaidUser,recibidaidSerie],(error,results) =>{
                    if(error){
                        console.log(error);
                    }else{
                        console.log("Se ha actualizado la critica de Serie");
                        
                        res.sendStatus(200)
                    }
                })
            }else{
                conexion.query('INSERT INTO critica_serie (serie_id, usuario_id) VALUES (? , ?)',[recibidaidSerie, recibidaidUser],(error, results)=>{
                    if(error){
                        console.log(error)
                    }else{
                        console.log("Se ha creado un registro")
                    }
                })
            }
        }
    })
});

export default router;