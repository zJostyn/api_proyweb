const { Pool } = require('pg');

const pool = new Pool({
    host: '127.0.0.1',
    user: 'postgres',
    password: 'jostyn001',
    database: 'proy_web',
    port: '5432'
});

//Obtener los detalles de daños de un tipo
async function getDetallesDaño(req, res) {
    const { id } = req.params;
    const query = 'SELECT iddetalledanio, idtipodanio, detalledanio FROM detalledanio WHERE idtipodanio = $1';
    const values = [id];
    try {
        const client = await pool.connect();
        const result = await client.query(query, values);
        client.release();
        if (result.rowCount > 0) {
            res.json(result.rows);
        } else {
            res.status(400).json({ message: 'No se encontraron los datos!' })
        }
    } catch (err) {
        res.status(500).json({ error: 'Error en el servidor!' });
    }
}

module.exports = { getDetallesDaño };