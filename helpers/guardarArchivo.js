//! Interacciones p/ grabar y leer desde ese archivo

const fs = require('fs');

//extension json 
const archivo = './db/data.json';

const guardarDB = ( data ) => {

    //Debe recibir un string para almacenar en txt
    //JSON.stringigy -> convierte un objeto a su version
    //de JSON valida como un string
    fs.writeFileSync( archivo,  JSON.stringify(data));
}

const leerDB = () => {
    
    if ( !fs.existsSync( archivo ) )
        return null;

    //Si no pongo el encoding, me devuelve los bits de la string leida
    //Leo mi archivo JSON completo
    const info = fs.readFileSync( archivo, { encoding: 'utf-8' } );
    
    //Metodo contrario a JSON.stringify
    //Transforma un string en un objeto
     const data = JSON.parse(info);

    //Retorno un array de objetos (almacenado en el JSON)
    return data;

};

module.exports = {
    guardarDB,
    leerDB,
}