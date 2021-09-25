
const mongoose=require('mongoose')
const URI = 'mongodb+srv://Sofka:sofka2021@cluster0.adhid.mongodb.net/test' /* nombre de la tabla */
mongoose.connect(URI, {   /* al conectarse la tabla se genera siertas propiedades como permitir un id index */
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify:false
}).then(db => console.log('conexion base de datos'))  /* si es correcto que muestre un mensage */
.catch(error=>console.log(error)  )
module.exports=mongoose /* exportar la base de datos para ser usada por el modelo.js */