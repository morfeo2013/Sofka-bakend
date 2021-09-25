const CuestionarioBase = {}/* determinar el mombre de la constante que se llamara el control */
const Cuestionario = require('../models/usuario.models')/* donde se encuentra el archivo moedels.js que contiene la tabla como sera introducida los modelos de la tabla de datos */

/* req es entrada del fronrnent 
    y res es la salida del bakend */


/* FUNCIONES */

/* se crean las funciones que se envian al archivo routes.js */
CuestionarioBase.leer = async (req, res) => {
    /* res.send('hola mundo')  */

    /* creo una constante y le asigno el valor de guardarmodelo  esta se le agrega la propiedadd  .find */
    /* esta le permite recorer y extraer  todos los json guardados */


    /* Obtenemos un valor aleatorio con ".aggregate([{ $sample: { size: 1 } }])"*/
    let listaBaseArreglo = await Cuestionario.aggregate([{ $sample: { size: 1 } }])
    /* elimino el arreglo */
    var [listaBaseObjeto]=listaBaseArreglo
    /* destructuracion del objeto */
    var{respuesta,pregunta}=listaBaseObjeto
    const ColoresFalsos=["verde","morado","gris","dorado","plateado"]
   
    var cuatroRandom = [];
    var posicionesElegibles = [];
    var i, r;
    for (i = 0; i < ColoresFalsos.length; i++) posicionesElegibles[i] = i;
    for (i = 0; i < 3; i++) {
      r = Math.floor(Math.random() * posicionesElegibles.length);
      cuatroRandom.push(ColoresFalsos[posicionesElegibles[r]]);
      posicionesElegibles.splice(r, 1);
    }
   /*  console.log(cuatroRandom.toString()); */
    cuatroRandom.push(respuesta)


    function shuffle(array) {
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
      arr = shuffle(cuatroRandom);

    res.json(pregunta+" "+arr)
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

     const usuarioUnico= await Cuestionario.findById({ _id: identificador },/* busca ese id en la base de datos comparando el _id  */
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
CuestionarioBase.crear = async (req, res) => {

    /* res.send('CREAR USUARIO funcion post') */
    /* recivira la informacion por el post del fronen y la guardara en la constarte de un objeto usando el req */
    const {pregunta,respuesta } = req.body   /* estos corresponde a los del models.js */


    /* se crea un nuevo modelo utilizando el que esta en la direccion Guardarmodelo asignando la informacion*/
    const nuevousuario = new Cuestionario({
        pregunta,
        respuesta,
        

    })
    await nuevousuario.save() /* guardara la informacion en la base de datos con await para que el proseso pueda terminar correctamente */
    res.json({ mensaje: 'Mensaje desde el Backend: Usuario gardado exitosamente' }) /* este mensaje se puede mostrar en el frontent */


}



module.exports = CuestionarioBase 