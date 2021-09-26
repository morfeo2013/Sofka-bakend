
/* determinar el mombre de la constante que se llamara el control */
const CuestionarioBase = {}

/* llamado a la base de datos segun su nivel de dificultad */
const NivelCanario = require('../models/usuario.models')
const NivelPaloma = require('../models/usuario.models2')
const NivelGaviota = require('../models/usuario.models3')
const NivelCondor = require('../models/usuario.models4')
const NivelAguila = require('../models/usuario.models5')

/* BASE DATOS PARA LOS JUGADORES */
const IngresoJugador = require('../models/jugadores.models')



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


/* LEER LISTA DE JUGADORES */

CuestionarioBase.LeerJugador = async (req, res) => {
    const listarJugadores = await IngresoJugador.find({})
    res.json(listarJugadores)/* envio el objeto como json  */
}


/* AGREGAR JUGADORES A LA BASE DE DATOS */

CuestionarioBase.crearJugador = async (req, res) => {


    const { nombre, puntaje } = req.body   /*recive estos, corresponde a los del models.js */


    /* VALIDACION DE USUARIO */
    /* antes de ingresar el Nuevo jugador se realiza una verificacion si ya esta en la base de datos */

    const VerificacionJugador = await IngresoJugador.findOne({ nombre: nombre })
    /* tome de la base de datos IngresoJugador la propiedad nombre y comparelo con el dato ingresdo desde el frontend con la propiedad nombre  */

    /* crea la condicion si esta repetido  if y else*/
    if (VerificacionJugador) {
        res.json({ mensage: 'Lo sentimos, pero solo puedes participar una sola vez' })

    } else {



        /* se crea un nuevo modelo utilizando el que esta en la direccion IngresoJugador asignando la informacion*/
        const nuevousuario = new IngresoJugador({
            nombre,
            puntaje,


        })
        await nuevousuario.save() /* guardara la informacion en la base de datos con await para que el proseso pueda terminar correctamente */
        res.json({ mensaje: 'Mensaje desde el Backend: Jugador Agregado' }) /* este mensaje se puede mostrar en el frontent */
    }

}


/* ORDENAMIENTO PREGUNTAS SEGUN SU NIVEL DE */


CuestionarioBase.leerUno = async (req, res) => {
    /* Obtenemos un valor aleatorio DE LA BASES DE DATOS  ".aggregate([{ $sample: { size: 1 } }])"*/
    let listaBaseArreglo1 = await NivelCanario.aggregate([{ $sample: { size: 1 } }])
    /* elimino el arreglo para tener solo el objeto*/
    var [listaBaseObjeto1] = listaBaseArreglo1
    /* destructuracion del objeto */
    var { respuesta, pregunta } = listaBaseObjeto1

    /* arrays con las opciones falsas */
    const ColoresFalsos = ["verde", "morado", "gris", "dorado", "plateado", "naranja", "purpura", "amariyo", "asul"]

    /* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
    /* ESCOJE 3 VALORES FALSOS A AZAR */

    const RespuestasFalsasXVerdaderas = new MezclarArrays1(ColoresFalsos);

    /* agrego la respuesta verdadera a las tres falsas escogidas para obtener 4 posibles opciones,  */
    RespuestasFalsasXVerdaderas.push(respuesta)

    /* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
    /* reorganizo las cuatro posibles opciones */

    /* utilizo la clase par amezclar las cuatro opciones */
    const arr = new MezclarArrays2(RespuestasFalsasXVerdaderas);

    res.json(
        
        {
            pregunta:pregunta,
            arr: arr,
            verdadera:respuesta
        }
        
        
        
        
        )
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
    const CiudadesFalsos = ["Medellin", "Cali", "Tokio", "Amazonas", "Kansas", "Caracas", "Choco", "Kanagawa"]

    /* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
    /* ESCOJE 3 VALORES FALSOS A AZAR */

    const RespuestasFalsasXVerdaderas = new MezclarArrays1(CiudadesFalsos);

    /* agrego la respuesta verdadera a las tres falsas escogidas para obtener 4 posibles opciones,  */
    RespuestasFalsasXVerdaderas.push(respuesta)

    /* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
    /* reorganizo las cuatro posibles opciones */

    /* utilizo la clase par amezclar las cuatro opciones */
    const arr = new MezclarArrays2(RespuestasFalsasXVerdaderas);

    res.json(
        
        {
            pregunta:pregunta,
            arr: arr,
            verdadera:respuesta
        }
        
        
        
        
        )



}


CuestionarioBase.leerTres = async (req, res) => {
    /* Obtenemos un valor aleatorio DE LA BASES DE DATOS  ".aggregate([{ $sample: { size: 1 } }])"*/
    let listaBaseArreglo = await NivelGaviota.aggregate([{ $sample: { size: 1 } }])
    /* elimino el arreglo para tener solo el objeto*/
    var [listaBaseObjeto] = listaBaseArreglo
    /* destructuracion del objeto */
    var { respuesta, pregunta } = listaBaseObjeto

    /* arrays con las opciones falsas */
    const PaisesFalsos = ["Colombia", "Argentina", "Alemania", "Australia", "China", "Isrrael", "Congo", "Indonesia"]

    /* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
    /* ESCOJE 3 VALORES FALSOS A AZAR */

    const RespuestasFalsasXVerdaderas = new MezclarArrays1(PaisesFalsos);

    /* agrego la respuesta verdadera a las tres falsas escogidas para obtener 4 posibles opciones,  */
    RespuestasFalsasXVerdaderas.push(respuesta)

    /* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
    /* reorganizo las cuatro posibles opciones */

    /* utilizo la clase par amezclar las cuatro opciones */
    const arr = new MezclarArrays2(RespuestasFalsasXVerdaderas);

    res.json(
        
        {
            pregunta:pregunta,
            arr: arr,
            verdadera:respuesta
        }
        
        
        
        
        )



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

    res.json(
        
        {
            pregunta:pregunta,
            arr: arr,
            verdadera:respuesta
        }
        
        
        
        
        )

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
    const arr = new MezclarArrays2(RespuestasFalsasXVerdaderas).toString();

    res.json(
        
        {
            pregunta:pregunta,
            arr: arr,
            verdadera:respuesta
        }
        
        
        
        
        )


}






module.exports = CuestionarioBase