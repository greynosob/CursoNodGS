require('dotenv').config()

const { leerInput, pausa,inquirerMenu,ListarOpciones } = require("./helpers/inquirer")
const Busquedas = require("./models/busquedas")




const main = async() => {

    let opt = ''
    const busquedas = new Busquedas

    do{
        opt = await inquirerMenu()

        switch (opt){
            case '1': //buscar ciudad

                //mostrar mensaje
                termino = await leerInput('Ciudad:')                
                // buscar lugares
                const lugares = await busquedas.ciudad(termino)
                const id = await ListarOpciones(lugares)                
                // seleccionar lugar
                const lugarSel = lugares.find(l => l.id === id)               
                if(lugarSel === '0')
                    continue;
                // guardar en db
                busquedas.agregarHistorial(lugarSel.nombre);
                // clima
                const clima = await busquedas.climaLugar(lugarSel.lat, lugarSel.lng)
                // mostrar resultados
                console.clear()
                console.log('\nInformación de la ciudad\n'.green)
                console.log('Ciduad:',lugarSel.nombre.blue)
                console.log('Lat:',lugarSel.lat)
                console.log('Lng:',lugarSel.lng)
                console.log('Clima:',clima.descripcion.blue)
                console.log('Temperatura:',clima.tempact)
                console.log('Mínima:'     ,clima.tempmin)
                console.log('Máxima:'     ,clima.tempmax)
                break;
            case '2': //Historial
                historial = busquedas.historialCapitalizado
                historial.forEach((lugar,i)=>{
                    const idx = `${i+1}`.green
                    console.log(`${idx} ${lugar}`)
                })
            break;            
        }

        if(opt !='0')
            await pausa()

    }while(opt != '0')
    
}

main();