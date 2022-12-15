import { createPool } from 'mysql2/promise'

//con éste objeto le indico a que BD se va a conectar
export const pool = createPool({
    //ruta
    host: 'localhost',
    //usuario
    user: 'root',
    password: '',
    port: 3306,
    //nombre de la base de datos
    database: 'fackeshop_db'
})