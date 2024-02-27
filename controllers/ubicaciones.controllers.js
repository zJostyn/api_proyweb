const { Pool } = require('pg');

const pool = new Pool({
    connectionString: 'postgres://proyweb_user:6Ay3HgZykEnlpoxuzlKwOjl23lUqxvVW@dpg-cmg040fqd2ns73a7mn5g-a.oregon-postgres.render.com/proyweb'
});

//Obtener todas las ubicaciones
async function getUbicaciones(req, res) {
    const query = 'SELECT idubicacion, lugarubi FROM ubicacion';
    try {
        const client = await pool.connect();
        const result = await client.query(query);
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

module.exports = { getUbicaciones };