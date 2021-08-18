require('colors');

const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { inquirerMenu, 
        pausa,
        leerInput,
        listadoTareasBorrar,
        confirmar,
        mostrarListadoChecklist
} = require('./helpers/inquirer'); 

const Tareas = require('./models/tareas');

const main = async () => {

    let opt = '';
    //Asigno a tareas, la clase
    //me permite el uso de todas las propiedades, metodos, etc
    const tareas = new Tareas(); 

    const tareasDB = leerDB();

    //Si existen tareas en nuestro JSON
    if( tareasDB ){
        //Cargo las tareas
        tareas.cargarTareasFromArray( tareasDB );
    };
    // await pausa();

    
    do{
        //Imprime menu y retorna opc ingresada (1|2|3|..).
        opt = await inquirerMenu();  

        switch (opt) {
            case '1':
                const desc = await leerInput('Descripcion:');
                tareas.crearTarea(desc);
            break;

            case '2':
                tareas.listadoCompleto(tareas.listadoArr);
            break;

            case '3': // Tareas completadas
                tareas.listarPendientesCompletadas(true, tareas.listadoArr); 
            break;
                
            case '4': // Tareas pendientes
                tareas.listarPendientesCompletadas(false, tareas.listadoArr);
            break;
            
            case '5': // Completado | pendiente
                const ids = await mostrarListadoChecklist( tareas.listadoArr );
                tareas.toggleCompletadas( ids );
            break;
            
            case '6': // Borrar tarea
                const id = await listadoTareasBorrar( tareas.listadoArr );
                if( id !== '0' ){
                    const ok = await confirmar('¿Estas seguro?')
                    if( ok ){
                        tareas.borrarTarea( id );
                        console.log('Tarea borrada');
                    };

                };
            break;
        };

        guardarDB( tareas.listadoArr );

        if( opt !== '0' )
            await pausa();

    } while (opt !== '0');

};

main();