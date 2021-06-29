const nombre = 'Deadpool'
const real ='Wade Winston'
const normal = nombre + ' '+ real

//permite concatenar valores calculados
//const template = `${1 + 1} Gaby Reynoso`
const template = `${ nombre } ${ real }`

console.log(normal)
console.log(template)

//son exatamente iguales >> SI
console.log(normal === template)

//este tipo de template permite manejar los cambios de línea
const html =  `
    <h1>Hola</h1>
    <p>Mundo</p>
`
console.log(html)

