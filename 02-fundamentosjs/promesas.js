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

const id = 1

/*getEmpleado(id)
    .then(empleado => console.log(empleado))
    .catch( err => console.log(err));

getSalario(id)
    .then(salario => console.log(salario))
    .catch( err => console.log(err));
*/

//HORROR!
/*
getEmpleado(id)
    .then(empleado => {
        getSalario(id)
        .then(salario => console.log('El empleado', empleado,'tiene salario de', salario))
        .catch( err => console.log(err));    
    })
    .catch( err => console.log(err));
*/

let nombre

//Promesas en cadena
getEmpleado(id).then(empleado => {
    nombre = empleado;
    return getSalario(id)
}).then(salario => console.log('El empleado:', nombre,'tiene un salario de:', salario)
).catch( err => console.log(err));