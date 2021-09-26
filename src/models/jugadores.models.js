const mongoose=require('mongoose')/* requerimos la bases de datos */
const {Schema}=mongoose/* se crea el esquema de la base de datos */

/* ACA SE RESPETA LA PALABRA RESERVADA SCHEMA */
/* creamos es modelo RESPETANDO  =NEW SCHEMA*/

const NuevoJugador=new Schema({
  

    nombre: String,
    puntaje: Number
 
}
)

module.exports=mongoose.model('jugador',NuevoJugador) /* user2 sera el  nombre de la tabla y */