const Tarea = require('./tarea');



class Tareas {

    _listado = {}; //propiedad

    get listadoArr() { //retornar nuevo arreglo

        const listado = [];

        //Extrae c/u de las keys del objeto y genero
        //un arreglo con todas las keys
        Object.keys(this._listado).forEach( key => {
            listado.push(this._listado[key]);
        });

        return listado;

    }

    constructor() {
        this._listado = {};
    }

    borrarTarea( id = '') {

        if( this._listado[id] ){ //Si existe
            delete this._listado[id]; //Lo elimino
        }

    }

    //Metodo, me recibe el arreglo de objetos TareasDB
    //Cargo las tareas en _listado
    cargarTareasFromArray ( tareas = [] ) {
        
        tareas.forEach( tarea => {
            this._listado[tarea.id] = tarea; //tarea.id -> uuidv4 (unico)    
        });

    }

    crearTarea( desc = '' ) {
        
        const tarea = new Tarea( desc );
        this._listado[tarea.id] = tarea; //tarea.id -> uuidv4 (unico)
    }

    listadoCompleto ( tareas = [] ) {

        console.log();
        
        tareas.forEach( (tarea, i) => {

            const index = `${i+1}`.green;
            const {desc, completadoEn} = tarea; //Destructuring
            const estado = (completadoEn) ? 'Completada'.green : 'Pendiente'.red;

            console.log(`${index}. ${desc} :: ${estado}`); 
        });

    };

    listarPendientesCompletadas( completadas = true, tareas = [] ) {
        
        let i = 0;

        if( completadas ){

            tareas.forEach( (tarea) => {
                
                if( tarea.completadoEn ){ //tarea completa
                    const index = `${++i}`.green;
                    const {desc} = tarea;
                    console.log( `${index}. ${desc}` );
                };
            });    
        }else{
            
            tareas.forEach( (tarea) => {
                
                if( !tarea.completadoEn ){ //tarea completa
                    const index = `${++i}`.green;
                    const {desc} = tarea;
                    console.log( `${index}. ${desc}` );
                };
            });    

        }
    };

    toggleCompletadas( ids = [] ){

        ids.forEach( id => {
            const tarea = this._listado[id];
            if( !tarea.completadoEn ){
                //Cambio el valor null por la fecha
                tarea.completadoEn = new Date().toISOString();
            }
        });

        this.listadoArr.forEach( tarea => {
            if( !ids.includes(tarea.id) ){  //Si tarea.id no esta incluido en ids[]
                this._listado[tarea.id].completadoEn = null;
            }
        });

    }

}

module.exports = Tareas;