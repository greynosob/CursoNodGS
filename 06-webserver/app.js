const express = require('express')
const hbs = require('hbs')
require('dotenv').config();

const app = express()
const port = process.env.PORT

//Handlebars
//app.set('view engine','hbs')
//hbs.registerPartials(__dirname+ '/views/partials')

//Servir contenido estático
app.use(express.static('public/angular-app'))

//cuando se incluye la carpeta pública ya no se ejecuta 
//este comando.
//app.get('/', function (req, res) {
//  res.send('Home')
//})

//app.get('/', function (req, res) {
//  //con hbs se pueden enviar parámetros a la páginas
//  res.render('home', {
//      nombre:'Gaby',
//      titulo: 'Curso de Node'
//  })
//})
//
//app.get('/elements', function (req, res) {
//    //con hbs se pueden enviar parámetros a la páginas
//    res.render('elements', {
//        nombre:'Gaby',
//        titulo: 'Curso de Node'
//    })
//  })
//
//app.get('/generic', function (req, res) {
//   //con hbs se pueden enviar parámetros a la páginas
//   res.render('generic', {
//       nombre:'Gaby',
//       titulo: 'Curso de Node'
//   })
//})

  
//app.get('/elements', function (req, res) {
//    res.sendFile(__dirname+'/public/elements.html')
//})
//
//app.get('/generic', function (req, res) {
//    res.sendFile(__dirname+'/public/generic.html')
//})
//
//app.get('/hola-mundo', function (req, res) {
//    res.send('Hello World')
//})

app.get('*', function (req, res) {
    res.sendFile(__dirname+'/public/angular-app/index.html')
    //res.sendFile(__dirname+'/public/404.html')
    //res.send('404 Page not found')
})

  
app.listen(port, () =>{
    console.log(`Lisenig at http://localhost:${port}`)
})