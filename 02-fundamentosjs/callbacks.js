//setTimeout( function(){
//    console.log( 'Hola mundo')
//}, 1000);

const getUsuarioByID = (id, Micallback) => {
    const usuario = {
        id, 
        nombre:'Gaby'
    }
    setTimeout(() => {
       //console.log(usuario) 
       Micallback(usuario) //llama a la función parámetro
    }, 1500)
}

//la función que se llama como argumento es un callback
getUsuarioByID(10, (usuario) => {
    //console.log('hola mundo')
    console.log(usuario.id)
    console.log(usuario.nombre.toUpperCase())
})