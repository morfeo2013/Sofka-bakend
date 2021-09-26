const CuestionarioBase = {}/* determinar el mombre de la constante que se llamara el control */
const NivelCanario = require('../models/usuario.models')/* donde se encuentra el archivo moedels.js que contiene la tabla como sera introducida los modelos de la tabla de datos */
const NivelPaloma = require('../models/usuario.models2')
const NivelGaviota = require('../models/usuario.models3')
const NivelCondor = require('../models/usuario.models4')
const NivelAguila = require('../models/usuario.models5')

/* BASE DATOS PARA LOS JUGADORES */
const IngresoJugador = require('../models/jugadores.models')

const LeerJugador = require('../models/jugadores.models')
/* req es entrada del fronrnent 
    y res es la salida del bakend */

/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
/* CLASES */
/* CLASE PARA EXTRAER ALEATORIAMENTE 3 RESPUESTAS FALSAS */

class MezclarArrays1 {
    constructor(ColoresFalsos) {

        var RespuestasFalsasXVerdaderas = [];
        var posicionesElegibles = [];
        var i, r;
        for (i = 0; i < ColoresFalsos.length; i++) posicionesElegibles[i] = i;
        for (i = 0; i < 3; i++) {
            r = Math.floor(Math.random() * posicionesElegibles.length);
            RespuestasFalsasXVerdaderas.push(ColoresFalsos[posicionesElegibles[r]]);
            posicionesElegibles.splice(r, 1);
        }
        return RespuestasFalsasXVerdaderas;
    }
}

/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
/* CLASE PARA MEZCLAR LAS CUATRO POSIBLES RESPUESTAS (1 REAL, 3 FALSAS)*/
class MezclarArrays2 {
    constructor(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        // Mientras queden elementos a mezclar...
        while (0 !== currentIndex) {

            // Seleccionar un elemento sin mezclar...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // E intercambiarlo con el elemento actual
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }
}


CuestionarioBase.LeerJugador = async (req, res) => {
const listarJugadores =await IngresoJugador.find({})
res.json(listarJugadores)/* envio el objeto como json  */
}



CuestionarioBase.crearJugador = async (req, res) => {

    /* res.send('CREAR USUARIO funcion post') */
    /* recivira la informacion por el post del fronen y la guardara en la constarte de un objeto usando el req */
    
    const { nombre, puntaje } = req.body   /* estos corresponde a los del models.js */


    /* VALIDACION DE USUARIO */
    /* antes de ingresar el Nuevo jugador se realiza una verificacion si ya esta en la base de datos */
  


      /* SE HARA UNA VERIFICACION EN LA BASE DE DATOS DI EL CORREO INGRESADO ESTA YA CREADO */
      const VerificacionJugador = await IngresoJugador.findOne({ nombre: nombre })
      /* tome de la base de datos Guardarmodelo1 la propiedad correo y comparelo con el dato ingresdo desde el frontend con la propiedad correo (correo:correo) */
  
      /* crea la condicion si esta repetido se us con if y else*/
      if (VerificacionJugador) {
          res.json({ mensage: 'Lo sentimos, pero solo puedes participar una sola vez' })
  
      } else {
    


    /* se crea un nuevo modelo utilizando el que esta en la direccion Guardarmodelo asignando la informacion*/
    const nuevousuario = new IngresoJugador({
        nombre,
        puntaje,


    })
    await nuevousuario.save() /* guardara la informacion en la base de datos con await para que el proseso pueda terminar correctamente */
    res.json({ mensaje: 'Mensaje desde el Backend: Jugador Agregado' }) /* este mensaje se puede mostrar en el frontent */
}

}

CuestionarioBase.leerUno = async (req, res) => {
    /* Obtenemos un valor aleatorio DE LA BASES DE DATOS  ".aggregate([{ $sample: { size: 1 } }])"*/
    let listaBaseArreglo1 = await NivelCanario.aggregate([{ $sample: { size: 1 } }])
    /* elimino el arreglo para tener solo el objeto*/
    var [listaBaseObjeto1] = listaBaseArreglo1
    /* destructuracion del objeto */
    var { respuesta, pregunta } = listaBaseObjeto1

    /* arrays con las opciones falsas */
    const ColoresFalsos = ["verde", "morado", "gris", "dorado", "plateado", "naranja", "purpura", "amariyo","asul"]

    /* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
    /* ESCOJE 3 VALORES FALSOS A AZAR */

    const RespuestasFalsasXVerdaderas = new MezclarArrays1(ColoresFalsos);

    /* agrego la respuesta verdadera a las tres falsas escogidas para obtener 4 posibles opciones,  */
    RespuestasFalsasXVerdaderas.push(respuesta)

    /* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
    /* reorganizo las cuatro posibles opciones */

    /* utilizo la clase par amezclar las cuatro opciones */
    const arr = new MezclarArrays2(RespuestasFalsasXVerdaderas);

    res.json(pregunta + " " + arr)
    /*  res.json(pregunta+" "+respuesta) */



}




CuestionarioBase.leerDos = async (req, res) => {
    /* Obtenemos un valor aleatorio DE LA BASES DE DATOS  ".aggregate([{ $sample: { size: 1 } }])"*/
    let listaBaseArreglo = await NivelPaloma.aggregate([{ $sample: { size: 1 } }])
    /* elimino el arreglo para tener solo el objeto*/
    var [listaBaseObjeto] = listaBaseArreglo
    /* destructuracion del objeto */
    var { respuesta, pregunta } = listaBaseObjeto

    /* arrays con las opciones falsas */
    const CiudadesFalsos = ["Medellin", "Cali", "Tokio", "Amazonas", "Kansas", "Caracas", "Choco","Kanagawa"]

    /* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
    /* ESCOJE 3 VALORES FALSOS A AZAR */

    const RespuestasFalsasXVerdaderas = new MezclarArrays1(CiudadesFalsos);

    /* agrego la respuesta verdadera a las tres falsas escogidas para obtener 4 posibles opciones,  */
    RespuestasFalsasXVerdaderas.push(respuesta)

    /* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
    /* reorganizo las cuatro posibles opciones */

    /* utilizo la clase par amezclar las cuatro opciones */
    const arr = new MezclarArrays2(RespuestasFalsasXVerdaderas);

    res.json(pregunta + " " + arr)
    /*  res.json(pregunta+" "+respuesta) */



}


CuestionarioBase.leerTres = async (req, res) => {
    /* Obtenemos un valor aleatorio DE LA BASES DE DATOS  ".aggregate([{ $sample: { size: 1 } }])"*/
    let listaBaseArreglo = await NivelGaviota.aggregate([{ $sample: { size: 1 } }])
    /* elimino el arreglo para tener solo el objeto*/
    var [listaBaseObjeto] = listaBaseArreglo
    /* destructuracion del objeto */
    var { respuesta, pregunta } = listaBaseObjeto

    /* arrays con las opciones falsas */
    const PaisesFalsos = ["Colombia", "Argentina", "Alemania", "Australia", "China", "Isrrael", "Congo","Indonesia"]

    /* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
    /* ESCOJE 3 VALORES FALSOS A AZAR */

    const RespuestasFalsasXVerdaderas = new MezclarArrays1(PaisesFalsos);

    /* agrego la respuesta verdadera a las tres falsas escogidas para obtener 4 posibles opciones,  */
    RespuestasFalsasXVerdaderas.push(respuesta)

    /* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
    /* reorganizo las cuatro posibles opciones */

    /* utilizo la clase par amezclar las cuatro opciones */
    const arr = new MezclarArrays2(RespuestasFalsasXVerdaderas);

    res.json(pregunta + " " + arr)
    /*  res.json(pregunta+" "+respuesta) */



}

CuestionarioBase.leerCuatro = async (req, res) => {
    /* Obtenemos un valor aleatorio DE LA BASES DE DATOS  ".aggregate([{ $sample: { size: 1 } }])"*/
    let listaBaseArreglo = await NivelCondor.aggregate([{ $sample: { size: 1 } }])
    /* elimino el arreglo para tener solo el objeto*/
    var [listaBaseObjeto] = listaBaseArreglo
    /* destructuracion del objeto */
    var { respuesta, pregunta } = listaBaseObjeto

    /* arrays con las opciones falsas */
    const PlantasFalsos = ["alicade", "Mitenix animus", "Chupameestepenco", "menta pericua", "Arbutus citrux", "Pruneles luzitanica", "Tronco retorcidus"]

    /* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
    /* ESCOJE 3 VALORES FALSOS A AZAR */

    const RespuestasFalsasXVerdaderas = new MezclarArrays1(PlantasFalsos);

    /* agrego la respuesta verdadera a las tres falsas escogidas para obtener 4 posibles opciones,  */
    RespuestasFalsasXVerdaderas.push(respuesta)

    /* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
    /* reorganizo las cuatro posibles opciones */

    /* utilizo la clase par amezclar las cuatro opciones */
    const arr = new MezclarArrays2(RespuestasFalsasXVerdaderas);

    res.json(pregunta + " " + arr)
    /*  res.json(pregunta+" "+respuesta) */



}

CuestionarioBase.leerCinco = async (req, res) => {
    /* Obtenemos un valor aleatorio DE LA BASES DE DATOS  ".aggregate([{ $sample: { size: 1 } }])"*/
    let listaBaseArreglo = await NivelAguila.aggregate([{ $sample: { size: 1 } }])
    /* elimino el arreglo para tener solo el objeto*/
    var [listaBaseObjeto] = listaBaseArreglo
    /* destructuracion del objeto */
    var { respuesta, pregunta } = listaBaseObjeto

    /* arrays con las opciones falsas */
    const literaturaFalsos = ["1446 - 1616", "1744 - 1814", "1744 - 1832", "1775 - 1815", "1797 - 1851", "1803 - 1885", "1819 - 1892"]

    /* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
    /* ESCOJE 3 VALORES FALSOS A AZAR */

    const RespuestasFalsasXVerdaderas = new MezclarArrays1(literaturaFalsos);

    /* agrego la respuesta verdadera a las tres falsas escogidas para obtener 4 posibles opciones,  */
    RespuestasFalsasXVerdaderas.push(respuesta)

    /* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
    /* reorganizo las cuatro posibles opciones */

    /* utilizo la clase par amezclar las cuatro opciones */
    const arr = new MezclarArrays2(RespuestasFalsasXVerdaderas);

    res.json(pregunta + " " + arr)
    /*  res.json(pregunta+" "+respuesta) */



}


CuestionarioBase.leerBase = async (req, res) => {
    /* res.send('hola mundo')  */

    /* creo una constante y le asigno el valor de guardarmodelo  esta se le agrega la propiedadd  .find */
    /* esta le permite recorer y extraer  todos los json guardados */

    /* sacamos el indice del usuario */

    const identificador = req.params.indexUsuario  /* se crea una constante donde guarde los datos
     para sacar el id que se suministro por fronent (req)
     para sacarlo de los parametros de la web (params)
      para identificar la variable que llamamos en el usuario.router.js en la direccion del /:indexUsuario*/

    const usuarioUnico = await Cuestionario.findById({ _id: identificador },/* busca ese id en la base de datos comparando el _id  */
        req.body) /* muestraun usuario index todo lo que le llegue por el req.bodyen el _id encontrado  con findById*/

    res.json(usuarioUnico)


}


CuestionarioBase.modificar = async (req, res) => {
    /*  res.send('Eviando una orden Post')  */


    /* sacamos el indice del usuario */

    const identificador = req.params.indexUsuario  /* se crea una constante donde guarde los datos
     para sacar el id que se suministro por fronent (req)
     para sacarlo de los parametros de la web (params)
      para identificar la variable que llamamos en el usuario.router.js en la direccion del /:indexUsuario*/

    /* con los siguientes comandos se busca el usuario usando la id suministrada */

    await Cuestionario.findByIdAndUpdate({ _id: identificador },/* busca ese id en la base de datos comparando el _id  */
        req.body) /* actualice todo lo que le llegue por el req.body osea todos los nuevos datos json a el _id encontrado  con  findByIdAndUpdate*/

    res.json({
        mensaje: "Mensaje desde el Backend: modifica el usuario con el id "
    })

}

CuestionarioBase.borrar = async (req, res) => {
    /*  res.send('Eviando una orden Delete')  */

    /* se usa tambien el id del usuario en la base de datos */
    const identificador = req.params.indexUsuario  /* se crea una constante donde guarde los datos
    para sacar el id que se suministro por fronent (req)
    para sacarlo de los parametros de la web (params)
     para identificar la variable que llamamos en el usuario.router.js en la direccion del /:indexUsuario*/

    await Cuestionario.findByIdAndDelete({ _id: identificador },/* busca ese id en la base de datos comparando el _id  */
        req.body) /* elimina todo lo que le llegue por el req.bodyen el _id encontrado  con findByIdAndDelete */

    res.json({

        mensaje: "Mensaje desde el Backend: usuario fue eliminado desde el put"


    })

}

/*      titulo,
        autor,
        genero,
        ficha */




module.exports = CuestionarioBase