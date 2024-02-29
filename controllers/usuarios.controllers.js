const { Pool } = require('pg');

const pool = new Pool({
    user: "zjostyn",
    host: "dpg-cnfuv7en7f5s73fbpn30-a",
    database: "proyweb_oabv",
    password: "zMsrZiyXpfaWy9kbA68QdlukDxaHivEe",
    port: 5432,
});

//funcion para devolver todos los usuarios
async function getUsuarios(req, res) {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM usuario');
        client.release();
        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).json({ error: 'Error en el servidor!' });
    }
}

//funcion para devolver todos los usuarios
async function verCorreosRegistrados(req, res) {
    const { email } = req.body;
    const query = 'SELECT * FROM usuario WHERE email = $1';
    const values = [email];
    try {
        const client = await pool.connect();
        const result = await client.query(query, values);
        client.release();
        if (result.rowCount >= 1) {
            res.status(400).json({ message: 'Ya existe un usuario con este correo!' })
        } else {
            res.status(200).json({ message: 'Correo no registrado!' })
        }
    } catch (err) {
        res.status(500).json({ error: 'Error en el servidor!' });
    }
}


//funcion para ingresar un usuario
async function createUsuario(req, res) {
    const { idtipousu, nombres, apellidos, email, pass, avatar } = req.body;
    const query = 'INSERT INTO usuario (idtipousu, nombres, apellidos, email, pass, avatar) VALUES ($1, $2, $3, $4, $5, $6)';
    const values = [idtipousu, nombres, apellidos, email, pass, avatar];
    try {
        const client = await pool.connect();
        const result = await client.query(query, values);
        client.release();
        if (result.rowCount > 0) {
            res.status(200).json({ message: 'Se creo el dato correctamente!' })
        } else {
            res.status(400).json({ message: 'No se pudo guardar el dato!' })
        }
    } catch (err) {
        res.status(500).json({ error: 'Error en el servidor!' });
    }
}

async function verificarUsuario(req, res) {
    const { email, pass } = req.body;
    const query = 'SELECT * FROM usuario WHERE email = $1 and pass = $2'
    const values = [email, pass];
    try {
        const client = await pool.connect();
        const result = await client.query(query, values);
        client.release();
        if (result.rowCount > 0) {
            res.status(200).json(result.rows)
        } else {
            res.status(400).json({ message: 'Error los datos ingresados son incorrectos!' })
        }
    } catch (err) {
        res.status(500).json({ error: 'Error en el servidor!' });
    }
}

module.exports = { getUsuarios, createUsuario, verificarUsuario, verCorreosRegistrados };