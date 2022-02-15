const Tarea = require("./tarea");
const colors = require('colors')


class Tareas {

    static contador = 1;

    get listadoArr() {
        const listado = []
        Object.keys(this._listado).forEach( key => {
            const tarea = this._listado[key];
            listado.push(tarea);
        });
        
        return listado;
    }


    constructor () {
        
        this.contador = Tareas.contador
        this._listado = {};
    }

    borrarTarea( id = '' ) {
        
       if(this._listado[id]) {
          delete this._listado[id]
       }
      }

      

    cargarTareasFromArray( tareas = [] ) {

        tareas.forEach( tarea => {
            this._listado[tarea.id] = tarea
        } )

    }    

    crearTarea( desc = '' )  {

        const tarea = new Tarea(desc)

        this._listado[tarea.id] = tarea;

    }


    listadoCompleto = () => {

        console.log('=================='.green)
        console.log(' Lista De Tareas'.white)
        console.log('==================\n'.green)


        this.listadoArr.forEach( obj => {
           let pendiente = obj.completadoEn
           pendiente !== null ? pendiente = 'Completada'.green : pendiente = 'Pendiente'.red
           console.log( ' ' +JSON.stringify(this.contador++).green+`.`.green + ` ${obj.descripcion} ::` + ` ${pendiente}` )
        } )

        console.log('\n')

        this.contador = 1
    }


    listadoPendientesCompletadas = ( completadas = true ) => {

        console.log('================================'.green)
        completadas ? console.log(' Lista De Tareas Completadas'.white) : console.log(' Lista De Tareas Pendientes'.white)
        console.log('================================\n'.green)


        this.listadoArr.forEach( obj => {
            if(completadas && obj.completadoEn !== null){console.log( ' ' +JSON.stringify(this.contador++).green+`.`.green + ` ${obj.descripcion} ::` + ` ${obj.completadoEn}`)}
            else if(!completadas && obj.completadoEn === null){console.log( ' ' +JSON.stringify(this.contador++).green+`.`.green + ` ${obj.descripcion} ::` + ` Pendientes`.red)} 
        } )

        console.log('\n')

        this.contador = 1

    }

    toggleCompletadas( ids = []) {

        ids.forEach( id => {

            const tarea = this._listado[id];

            if(tarea.completadoEn === null ) {
                tarea.completadoEn = new Date().toISOString()
            }

            });
        

            this.listadoArr.forEach( tarea => {

                if(!ids.includes(tarea.id)) {
                     this._listado[tarea.id].completadoEn = null;
                }
           }); 

    }

}


module.exports = Tareas