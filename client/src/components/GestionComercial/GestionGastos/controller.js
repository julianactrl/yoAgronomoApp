import Clasificacion from "./Clasificacion"



export function renderClasificaciones (clasificaciones, createdClasificaciones) {
    if(clasificaciones[0] == createdClasificaciones[0]) {
        var allClasificaciones = createdClasificaciones
    }else{
        var allClasificaciones = clasificaciones.concat(createdClasificaciones)
    }

    console.log('todas las clasificaciones locooooooooo',allClasificaciones);

    return (
        allClasificaciones[0] ? allClasificaciones.map(item => {
            return <Clasificacion id={item.id} name={item.name} />
        }) : null
    )

}