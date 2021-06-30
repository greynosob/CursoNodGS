//incluyendo archivo que se acaba de realizar
const {crearArchivo} = require('./helpers/multiplicar');
const argv = require('./config/yargs');


//const base = 4
console.clear();

//console.log(process.argv)
console.log(argv)
console.log('base',argv.base, 'listar', argv.listar, 'hasta', argv.hasta)

//const [,,arg3='base=5'] = process.argv;
//const[,base=5] = arg3.split('=')
//console.log(arg3)
//console.log(base)

crearArchivo( argv.base, argv.listar,argv.hasta ).then(
    nomArchivo => console.log(nomArchivo, 'creado')
    ).catch(err => console.log(err))


//opción A
//fs.writeFile(`tabla-${base}.txt`,salida, (err)=>{
//    if(err) throw err;
//    console.log(`tabla del ${base} creada`)
//})


//opción B
//fs.writeFileSync(`tabla-${base}.txt`,salida)
