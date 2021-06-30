require('colors');

//const { mostrarMenu , pausa} = require('./helpers/mensajes')
const{inquirerMenu, pausa,leerInput,listadoTareasBorrar,confirmar,mostrarListadoChecklist} = require('./helpers/inquirer')
//const {Tarea} = require('./models/tarea')
const Tareas = require('./models/tareas')
const { guardarDB,leerDB } = require('./database/guardarArchivo')

const main = async () => {
    console.clear()
    //console.log('Hola')

    let opt =''
    const tareas = new Tareas();
    const tareasDB = leerDB();
    if(tareasDB){
      tareas.cargarTareasFromArray(tareasDB)
    }

    do{
      //  opt = await mostrarMenu();
      //  console.log({opt})
      //  if(opt !== '0')
      //      await pausa();
    
      opt = await inquirerMenu();
      //console.log({opt})
      switch (opt){
          case '1': //crear
                const desc = await leerInput('Descripción:');                
                tareas.crearTarea(desc)
              break;
          case '2': //listar
                tareas.listadoCompleto()
               //console.log(tareas.listadoArr)
              break;
          case '3': //listar completadas
              tareas.listarPendientesCompletadas()             
            break;
          case '4': //listar pendientes
            tareas.listarPendientesCompletadas(false)            
            break;
          case '5': //listar pendientes
              const ids = await mostrarListadoChecklist(tareas.listadoArr)
              tareas.toggleCompletadas(ids)
            break;            
          case '6': //borrar tarea
             const id = await listadoTareasBorrar(tareas.listadoArr)            
             if(id !=='0'){//Cancelar
                const ok = await confirmar('¿Estás seguro?')
                
                if(ok){
                    tareas.borrarTarea(id)
                    console.log('Tarea borrada')
                }
            }
            break;
            
      }

      guardarDB(tareas.listadoArr);

      await pausa();

    }while(opt != '0')
}

main();