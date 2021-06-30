
//importar fs para manipular archivos
const colors = require('colors');
const { rejects } = require('assert');
const fs = require('fs');

const crearArchivo = async (base = 5, listar = false, hasta = 10) => {
    
    try {
        if(listar){
            console.log(colors.rainbow("================================="));
            console.log(colors.random('Tabla del '),base);
            console.log(colors.rainbow("================================="));
        }

        let nomArchivo = '';
        let salida, consola = '';

        for(let i = 0; i <= hasta; i++){
            salida+=`${base} ${'x'.red} ${i} ${'='.red} ${base*i}\n`;
            consola+=`${base} x ${i} = ${base*i}\n`;
        }
        
        if(listar)
            console.log(salida);

        nomArchivo = `tabla-${base}.txt`
    
        fs.writeFileSync(nomArchivo,consola);
        
        if(listar)
            console.log(colors.cyan(`tabla del ${base} creada`));
        
        return nomArchivo
    }catch(error){

        throw error
    }    
}

module.exports = {
   // crearArchivo: crearArchivo
   crearArchivo
}