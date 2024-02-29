const { Pool } = require('pg');

const pool = new Pool({
    user: "zjostyn",
    host: "dpg-cnfuv7en7f5s73fbpn30-a",
    database: "proyweb_oabv",
    password: "zMsrZiyXpfaWy9kbA68QdlukDxaHivEe",
    port: 5432,
});

//Obtener los tipos de daños
async function getTipoDaños(req, res) {
    const query = 'SELECT idtipodanio, tipodanio FROM tipodanio';
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

module.exports = { getTipoDaños };