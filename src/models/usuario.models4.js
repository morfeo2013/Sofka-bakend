const mongoose=require('mongoose')/* requerimos la bases de datos */
const {Schema}=mongoose/* se crea el esquema de la base de datos */

/* ACA SE RESPETA LA PALABRA RESERVADA SCHEMA */
/* creamos es modelo RESPETANDO  =NEW SCHEMA*/

const NuevoModelTabla4=new Schema({
  

    pregunta: String,
    respuesta: String
 
}
)

module.exports=mongoose.model('condor',NuevoModelTabla4) /* user2 sera el  nombre de la tabla y */