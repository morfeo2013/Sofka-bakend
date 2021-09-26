const { Router } = require('express') /* comando que importa las fuciones de Route para relacionar las direcciones ingressadas en la pagina web */
const route = Router()/* se crea una constante para utilizar las propiedades del Route */
const UserControl = require('../controllers/usuario.controllers')/* importar el controlador js */

/* ACA SE CREAN LAS RUTAS QUESERAN LEIDAS EN LA WEB */

/* RUTAS NIVEL DE DIFICULTAD PREGUNTAS */

route.get('/NivelCanario',UserControl.leerUno )/* realizar la peticion get,put,delete,pos creadasen el controlls*/

route.get('/NivelPaloma',UserControl.leerDos )/* realizar la peticion get,put,delete,pos creadasen el controlls*/

route.get('/NivelGaviota',UserControl.leerTres )/* realizar la peticion get,put,delete,pos creadasen el controlls*/

route.get('/NivelCondor',UserControl.leerCuatro )/* realizar la peticion get,put,delete,pos creadasen el controlls*/

route.get('/NivelAguila',UserControl.leerCinco )/* realizar la peticion get,put,delete,pos creadasen el controlls*/



route.post('/jugador',UserControl.crearJugador )

route.get('/listarjugadores',UserControl.LeerJugador )



route.get('/obtener/:indexUsuario',UserControl.leerBase )/* realizar la peticion get,put,delete,pos creadasen el controlls*/
route.put('/modificar/:indexUsuario',UserControl.modificar )/* se selecciona la funcion que coresponde con la orden se adiciona el :index  para operaciones de modificacion de clientes */
route.delete('/eliminar/:indexUsuario',UserControl.borrar )




module.exports = route                                                                                                                                                       