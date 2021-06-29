const deadpool ={
    nombre:'Wade',
    apellido:'Winston',
    poder:'Regeneración',

 // las dos declaraciones son válidas
 //   getNombre : function(){ 
    getNombre (){
        return  `${this.nombre} ${this.apellido} ${this.poder}`
    }
}

//console.log(deadpool.getNombre())

//const nombre   = deadpool.nombre
//const apellido = deadpool.apellido
//const poder    = deadpool.poder
//console.log(nombre, apellido, poder)

//esta es la desestructuración
//const {nombre, apellido, poder} = deadpool;
//console.log(nombre, apellido, poder)

//se crea una variable con valor predeterminado
//const {nombre, apellido, poder, edad=50} = deadpool;
//console.log(nombre, apellido, poder, edad)

//function imprimeHeroe (heroe){
//    const {nombre, apellido, poder, edad=50} = deadpool;
//    console.log(nombre, apellido, poder, edad)
//}

//imprimeHeroe(deadpool)

//desestructuración como parámetros
function imprimeHeroe ({nombre, apellido, poder, edad=50}){    
    console.log(nombre, apellido, poder, edad)
}

//imprimeHeroe(deadpool)

const heroes = ['Deadpool', 'Superman', 'Batman']

//const h1 = heroes[0]
//const h2 = heroes[1]
//const h3 = heroes[2]
//console.log(h1,h2,h3)

const [h1,h2,h3] = heroes
console.log(h1,h2,h3)

const [,,h4] = heroes
console.log(h4)

