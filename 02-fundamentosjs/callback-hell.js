const empleados = [
    {    id: 1,
        nombre: 'Gaby'
    },
    {    id: 2,
        nombre: 'Pedro'
    },
    {    id: 3,
        nombre: 'Elvira'
    },
];

const salarios = [
    { id: 1,
      salario : 1000 
    },
    { id: 2,
        salario : 1500 
      }
];

const getEmpleado = (id, callback) => {
    const empleado = empleados.find(e => e.id === id)?.nombre

    if(empleado){
        // se retorna null en el valor err
        //        v
        callback(null,empleado);
    }else{
        callback(`Empleado con id ${id} no existe`)
    }
}

const getSalario = (id, callback) => {
                                        // NULL CHECK 
                                        //         v
    const salario = salarios.find(e => e.id === id)?.salario

    if(salario){
        // se retorna null en el valor err
        //        v
        callback(null,salario);
    }else{
        callback(`Salario con id ${id} no existe`)
    }
}

const id = 3

//getEmpleado(id,(err,empleado) => {
    
//    if(err){
//        console.log('Error!!')
//        return console.log(err)
//    }

//    console.log('Encontrado')
//    console.log(empleado.nombre)
//})

//getSalario(id,(err,salario) => {
    
//    if(err){
//        console.log('Error!!')
//        return console.log(err)
//    }

//    console.log('Encontrado')
//    console.log(salario)
//})

//HELL -- no necesariamente el id existe en ambos lados
getEmpleado(id,(err,empleado) => {
    
    if(err){
        console.log('Error!!')
        return console.log(err)
    }

    //acá se llama a otra función con callback y se puede
    //llegar a N anidaciones
    getSalario(id,(err,salario) => {
    
        if(err){
            console.log('Error!!')
            return console.log(err)
        }
    
        console.log('Encontrado')
        console.log('El empleado:', empleado, 'tiene un salario de:', salario)
    })
})

