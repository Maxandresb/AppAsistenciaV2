export interface credenciales{
    username:string,
    password:string,
    
}

export interface Usuario{
    uid:string,
    email:string,
    nombre:string,
    asignaturas:Asignatura[],
    
}

export interface Asignatura{
    id:string,
    nombre:string,
    codigo:string,
    email:string,
    asistencias:Asistencia[],
}


export interface Asistencia{
    id:string,
    fechaHora:any,
}