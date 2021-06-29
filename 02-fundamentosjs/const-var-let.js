//no es recomendable usar var (global) porque se pierde en el contexto y genera confusión
//let es una declaración dentro del scope
//const impide poder cambiar el valor no tienen propiedades set
//   >> son más ligeras
const nombre = 'Wolverine'

if(true){
    //se re declara la variable con let
    //también se re declaran las consantes
    const nombre = 'Magneto'
    console.log(nombre)
}

console.log(nombre)