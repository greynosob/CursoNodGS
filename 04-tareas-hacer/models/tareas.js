const colors = require("colors");
const Tarea = require("./tarea")

class Tareas {
    _listado = {}

    get listadoArr(){
        const listado = [];

        Object.keys(this._listado).forEach( key =>{
            const tarea = this._listado[key];
            listado.push(tarea)
        } )

        return listado;
    }

    constructor(){
        this._listado = {}
    }

    borrarTarea(id = ''){
    
        if(this._listado[id]){
            delete this._listado[id]
        }
    
    }

    crearTarea(desc = ''){
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    cargarTareasFromArray (tareas =[]){
        
        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        })
    }

    listadoCompleto(){
        const arrtareas = this.listadoArr                      
        let output = ''
        
        console.log('\n')

        arrtareas.forEach((tarea,i) => {
            output =`${i+1}. `.green
            output += `${tarea.desc} :::`.white

            if(!tarea.completadoEn)
                output += colors.red(' Pendiente')
            else
                output += tarea.completadoEn.green +'::'+ colors.green(' Completo')
            console.log(output)
        })
    }

    listarPendientesCompletadas(completadas = true){
        const arrtareas = this.listadoArr                      
        let output = ''
        let i = 1;
        console.log('\n')

        arrtareas.forEach((tarea) => {

            if((completadas && tarea.completadoEn)||
                (!completadas && !tarea.completadoEn)){
            
                output =`${i++}. `.green
                output += `${tarea.desc} :::`.white

                if(!tarea.completadoEn)
                    output += colors.red(' Pendiente')
                else
                    output += colors.green(' Completo')
                
                console.log(output)
            }
        })
    }

    toggleCompletadas(ids = []){
        ids.forEach( id => {
            const tarea = this._listado[id]
            if(!tarea.completadoEn){
                tarea.completadoEn = new Date().toISOString()
            }
        })

        this.listadoArr.forEach(tarea => {
            if(!ids.includes(tarea.id)){
                this._listado[tarea.id].completadoEn = null
            }
        })
    }
}

module.exports = Tareas