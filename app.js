import express from 'express'
import cors from 'cors'
import { pool } from './db.js'

//levanto el servidor
const app = express()

//le digo que va a reibir datos en formato Json
app.use(express.json())
//que use cors para peritir la comunicación con cualquier aplicación
app.use(cors())

//servicios
app.post('/register', async (req, res) => {
    const { name, last_name, password, email } = req.body
    const [rows] = await pool.query(
        'INSERT INTO users (name,last_name,password,email) VALUES(?,?,?,?)',
        [name, last_name, password, email]
    )
    res.status(200).json({ rows })
})

app.get('/', async (req, res) => {
    const [rows] = await pool.query(
        'SELECT * FROM users where id=1'
    )
    res.status(200).json(rows[0])
})

app.listen(3001, () => {
    console.log('servidor arriba en el puerto 3001')
})