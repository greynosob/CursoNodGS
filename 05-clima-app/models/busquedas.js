const fs = require('fs')

const axios = require('axios')

class Busquedas {

    historial = []
    dbPath = './db/database.json'
    constructor(){
        //TODO: leer DB si existe
        this.leerDB()
    }

    get paramsMapbox(){
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit':5,
            'language':'es'
        }
    }
    async ciudad( lugar = '') {

        try{
            //petición http
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params: this.paramsMapbox
            })        

            const resp = await instance.get()
            return resp.data.features.map(lugar => ({
                id:lugar.id,
                nombre:lugar.place_name,
                lng: lugar.center[0],
                lat: lugar.center[1]
            }))
            
        }catch(error){
            return []
        }
    }

    get paramsOpenweather(){
        return {            
            appid:process.env.OPEN_WEATHER,
            units:'metric',
            lang:'es'
        }
    }

    toCamelCase(str){
        return str.split(' ').map(function(word,index){          
          // If it is not the first word only upper case the first char and lowercase the rest.
          return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        }).join('');
      }

    get historialCapitalizado(){

        let chistorial = []

        this.historial.forEach((lugar,i)=>{          
            chistorial.unshift( this.toCamelCase(lugar));   
        })

        return chistorial;
    }

    async climaLugar(lat, lon){
        try{

            //petición http
            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: {...this.paramsOpenweather, lat, lon}
            })        

            const resp = await instance.get()
            const {weather, main} = resp.data
            
            return {
                descripcion:weather[0].description,
                tempact:main.temp,
                tempmax:main.temp_max,
                tempmin:main.temp_min,
            }

        }catch(error){
            console.log(error)
        }
    }

    agregarHistorial(lugar=''){
        
        if(this.historial.includes(lugar.toLocaleLowerCase()))
            return;

        //solamente las últimas 6 búsquedas
        this.historial = this.historial.splice(0,5)

        this.historial.unshift(lugar.toLocaleLowerCase());        

        this.guardarDB()
    }

    guardarDB(){
        const payload = {
            historial: this.historial
        }
        fs.writeFileSync(this.dbPath, JSON.stringify(payload))
    }

    leerDB(){

        if(!fs.existsSync(this.dbPath)){
            return 
        }

        const info = fs.readFileSync(this.dbPath, {encoding:'UTF-8'})        
        const data = JSON.parse(info); 
        this.historial = data.historial
    }
}

module.exports = Busquedas