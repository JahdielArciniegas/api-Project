import { Router } from "express";
import { conexion } from "../db.js";


const router = Router()

router.get ('/obtener_criticaP', (req,res) => {
    const consulta = 'SELECT * FROM critica_pelicula';
    conexion.query(consulta,function(error,resultado){
        if(error){
            res.status(500).json({error: 'Error al obtener registros'});
        }else{
            res.json(resultado)
        }
    })
})

router.post('/enviar_criticaP', (req, res) => {
    const recibidaidMovie = req.body.movie;
    const recibidaidUser = req.body.user;
    const puntajeCritica = req.body.points
    const opinionCritica = req.body.opinion
    
    conexion.query('SELECT * FROM critica_pelicula WHERE usuario_id = ? AND pelicula_id = ?', [recibidaidUser , recibidaidMovie], (error,results) =>{
        if(error){
            console.log(error);
        }else{
            if(results.length > 0){
                conexion.query('UPDATE critica_pelicula SET puntaje_criticaP = ?, opinion_criticaP = ? WHERE usuario_id=? AND pelicula_id=?',
                [puntajeCritica,opinionCritica,recibidaidUser,recibidaidMovie],(error,results) =>{
                    if(error){
                        console.log(error);
                    }else{
                        console.log("Se ha actualizado la critica de Pelicula");
                        
                        res.sendStatus(200)
                    }
                })
            }else{
                conexion.query('INSERT INTO critica_pelicula (pelicula_id, usuario_id) VALUES (? , ?)',[recibidaidMovie, recibidaidUser],(error, results)=>{
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