import express from 'express'
import cors from 'cors'
import { pool } from './db.js'

//levanto el servidor
const app = express()

//le digo que va a reibir datos en formato Json
app.use(express.json())

//que use cors para permitir la comunicación con cualquier aplicación
app.use(cors())

//servicios que presta el servidor: registrar, modificar, eliminar, loguear
app.post('/register', async (req, res) => {
    const { name, last_name, password, email } = req.body
    const [emailComprobation] = await pool.query(
        'SELECT email FROM users where email = ?', [email]
    )

    if (!emailComprobation[0]) {
        const [rows] = await pool.query(
            'INSERT INTO users (name,last_name,password,email) VALUES(?,?,?,?)',
            [name, last_name, password, email]
        )
        res.status(200).json({ rows })
    } else {
        res.status(404).send('El usuario ya tiene una cuenta')
    }

})

app.post('/login', async (req, res) => {
    const { password, email } = req.body

    const [emailComprobation] = await pool.query(
        'SELECT * FROM users where email = ? and password = ?', [email, password]
    )

    if (emailComprobation[0]) {
        res.status(200).json(emailComprobation[0])
    } else {
        res.status(404).send('El usuario no posee una cuenta')
    }

})

app.put('/user', async (req, res) => {
    const { name, last_name, password, email } = req.body
    const [emailComprobation] = await pool.query(
        'SELECT id FROM users where email = ?', [email]
    )

    if (emailComprobation[0]) {
        let id = emailComprobation[0].id
        const [rows] = await pool.query(
            'UPDATE users SET name=?, last_name=?, password=?, email=? WHERE id = ?',
            [name, last_name, password, email, id]
        )
        res.status(200).json({ rows })
    } else {
        res.status(404).send('El usuario ya tiene una cuenta')
    }
})

app.delete('/user/delete/:id', async (req, res) => {
    const { id } = req.params

    if (id) {
        const [rows] = await pool.query(
            'DELETE FROM users WHERE id = ?',
            [id]
        )
        return res.status(200).send('usuario eliminado')
    } else {
        return res.status(404).send('No se encuentra usuario')
    }
})

//le digo al servidor en que puerto va a estar
app.listen(3001, () => {
    console.log('servidor arriba en el puerto 3001')
})