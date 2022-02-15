require('colors');


const { guardarDB, leerDB } = require('./helper/guardarArchivo');
const { inquirerMenu, Pausa, leerInput, ListadoTareasBorrar, confirmar,mostrarListadoCheckList } = require('./helper/inquirer');
const Tareas = require('./models/tareas');





// console.clear()


const main = async() => {   

    let opt = '';
    const tareas = new Tareas();

    const tareasDB = leerDB();


    if (tareasDB) {
        tareas.cargarTareasFromArray(tareasDB)    
    }

    do {

     opt = await inquirerMenu();

     switch (opt) {
         case '1':
             const desc = await leerInput('Descripcion: ');
             tareas.crearTarea( desc );
         break;

         case '2':
             console.clear()
             tareas.listadoCompleto()
         break;
         
         case '3':
             console.clear()
             tareas.listadoPendientesCompletadas()
         break;
         
         case '4':
             console.clear()
             tareas.listadoPendientesCompletadas(false)
         break;
         
         case '5':
             console.clear()
             const ids = await mostrarListadoCheckList(tareas.listadoArr)
             tareas.toggleCompletadas(ids)
             
             
         break;
         
         case '6':
             const id = await ListadoTareasBorrar(tareas.listadoArr)
             if(id !== '0') {
                 const ok = await confirmar('Estas seguro Que deseas Borrarlo?')
                 ok && tareas.borrarTarea(id)
                 console.log('Tarea Borrada')
             }
         
         break;    
     }


     guardarDB( tareas.listadoArr )

     await Pausa();
   

    } while ( opt !== '0');


    

}


main();