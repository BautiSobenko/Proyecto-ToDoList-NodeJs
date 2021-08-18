require('colors');
const inquirer = require('inquirer');

const preguntas = [
    {
        type: 'list',
        name: 'opcion', //Se debe corresponder a la variable que recibe la promesa(await)
        message: '¿Qué desea hacer?',
        choices: [ //Arreglo de objetos

            {
                value: '1', //Lo que nos devuelve
                name: `${'1.'.green} Crear tarea` //opt name 1
            },
            {
                value: '2',
                name: `${'2.'.green} Listar tareas `
            },
            {
                value: '3',
                name: `${'3.'.green} Listar tareas completadas`
            },
            {
                value: '4',
                name: `${'4.'.green} Listar tareas pendientes`
            },
            {
                value: '5',
                name: `${'5.'.green} Completar tarea(s)`
            },
            {
                value: '6',
                name: `${'6.'.green} Borrar tarea`
            },
            {
                value: '0',
                name: `${'0.'.green} Salir`
            },
        ]
    }
];

const inquirerMenu = async() => {

    console.clear();

    console.log('==================='.green);
    console.log('Seleccione una opción'.white);
    console.log('===================\n'.green);

    //recibe un array de preguntas
    const {opcion} = await inquirer.prompt(preguntas);

    return opcion;

};

const pausa = async() => {

    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `Presione ${'ENTER'.green} para continuar`,
        }
    ];
    console.log('\n');

    await inquirer.prompt(question);
    
};

const leerInput = async( message ) => {

    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value){
                if( value.length === 0 ){
                    return 'Por favor ingrese un valor';
                }else
                    return true;
            }
        }
    ];

    const {desc} = await inquirer.prompt(question); //El inquirer regresa un objeto

    return desc; //Me regresa lo escrito por el usuario
}

const listadoTareasBorrar = async( tareas = []) => {

    //Me devuelve un arreglo choices en donde cada hijo 
    //tiene lo que me devuelve el return
    const choices = tareas.map( (tarea, i) => {
        
        const index = `${i + 1}`.green;

        return { 
            value: tarea.id,
            name: `${index} ${tarea.desc}`
        };
    });

    choices.unshift( {
        value: '0',
        name: '0.'.green + ' Cancelar' 
    });

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices,
        }
    ]

    const {id} = await inquirer.prompt(preguntas);

    return id; //Devuelve promesa
    
};

const confirmar = async( message ) => {

    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message,
        }
    ];

    const {ok} = await inquirer.prompt(question);

    return ok; //Regresa valor booleano(gracias al confirm) 

}

const mostrarListadoChecklist = async( tareas = []) => {

    //Me devuelve un arreglo choices en donde cada hijo 
    //tiene lo que me devuelve el return
    const choices = tareas.map( (tarea, i) => {
        
        const index = `${i + 1}`.green;

        return { 
            value: tarea.id,
            name: `${index} ${tarea.desc}`,
            checked: ( tarea.completadoEn ) ? true : false
        };
    });

    const pregunta = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Seleccione',
            choices,
        }
    ]

    const {ids} = await inquirer.prompt(pregunta);

    return ids; //Devuelve promesa
    
};

module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoChecklist
}
