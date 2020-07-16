export interface Usuario {
    _id?: string;
    nombre: string;
    apellido: string;
    email: string;
    imagen: string;
    password?: string;
    createAt?: string;
    sessionID?: string;
}
