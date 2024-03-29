const { Pool } = require('pg');

const pool = new Pool({
    connectionString: 'postgres://zjostyn:zMsrZiyXpfaWy9kbA68QdlukDxaHivEe@dpg-cnfuv7en7f5s73fbpn30-a/proyweb_oabv'
});


//funcion para devolver todas las puntuaciones
async function getPuntuaciones(req, res) {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM retroalimentacion');
        client.release();
        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).json({ error: 'Error en el servidor!' });
    }
}

//funcion para ingresar una puntuacion
async function createPuntuacion(req, res) {
    const { puntuacion} = req.body;
    const query = 'INSERT INTO retroalimentacion(puntuacion) VALUES ($1);';
    const values = [puntuacion];
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

module.exports = { createPuntuacion, getPuntuaciones };