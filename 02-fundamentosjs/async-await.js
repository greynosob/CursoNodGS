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

const getEmpleado = (id) => {
    const empleado = empleados.find(e => e.id === id)?.nombre    
    return new Promise( (resolve, reject) => {
            if(empleado)
                resolve(empleado)
            else
                reject(`No existe el empleado ${id}`)

    });
}

const getSalario = (id) => {
    const salario = salarios.find(s => s.id === id)?.salario
    return new Promise( (resolve, reject) => {
        if(salario)
            resolve(salario)
        else
            reject(`No existe el salario ${id}`)
    });
}

//await debe estar en un método asíncrono

const getInfoUsuario = async(id) => {
    try{
        const empleado = await getEmpleado(id)
        const salario  = await getSalario(id)
        return `El salario del empleado: ${empleado} es de ${salario}`
    }catch(error){
        throw error;
    }
}

const id = 10
getInfoUsuario(id).then(msg => console.log(msg)).catch(err => console.log(err))

