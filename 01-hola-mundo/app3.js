
console.log('Inicio de programa')

setTimeout(() => {
    console.log('Primer Timer')
}, 3000)

setTimeout(() => {
    console.log('Segundo Timer')
}, 0)

setTimeout(() => {
    console.log('Tercer Timer')
}, 0)

console.log('Fin de programa')

/* output:

Inicio de programa
Fin de programa
Segundo Timer  
Tercer Timer   
Primer Timer

*/