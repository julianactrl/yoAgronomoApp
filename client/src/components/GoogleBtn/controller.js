

// funcion que recibe los datos del usuario que se logueo con google
export function respuestaGoogle(data) {
    console.log(data);
    console.log(data.profileObj);//profileObj contiene la info del usuario
}
//funciones de logout
export function logoutExistoso(){
    console.log('Se deslogueo exitosamente');
}
export function logoutRechazado(data){
    console.log(data, 'esta fallando algo');
}