const { Pool } = require('pg');

const pool = new Pool({
    user: "zjostyn",
    host: "dpg-cnfuv7en7f5s73fbpn30-a",
    database: "proyweb_oabv",
    password: "zMsrZiyXpfaWy9kbA68QdlukDxaHivEe",
    port: 5432,
});

//Obtener las soluciones hechas de un encargado
async function getSolucionesEncargado(req, res) {
    const { id } = req.params;
    const query = 'SELECT S.idsolucion, R.idreporte, CONCAT(U.nombres,' + "' '" + ',U.apellidos) AS encargado, ES.descripciones AS estadosolucion, S.fecha , S.descripcions, R.evidencia FROM solucion S, reporte R, usuario U, estadosolucion ES WHERE S.idencargado = $1 and S.idreporte = R.idreporte and S.idencargado = U.idusuario and S.idestadosolucion = ES.idestadosolucion';
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

//Obtener los 3 ultimos reportes de un usuario
async function getUltimasSolucionesEncargado(req, res) {
    const { id } = req.params;
    const query = 'SELECT S.idsolucion, R.idreporte, CONCAT(U.nombres,' + "' '" + ',U.apellidos) AS encargado, ES.descripciones AS estadosolucion, S.fecha , S.descripcions, R.evidencia FROM solucion S, reporte R, usuario U, estadosolucion ES WHERE S.idencargado = $1 and S.idreporte = R.idreporte and S.idencargado = U.idusuario and S.idestadosolucion = ES.idestadosolucion ORDER BY R.fecha DESC FETCH FIRST 3 ROWS ONLY';
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

//Obtener cantidad de reportes abiertos de un usuario
async function getSolucionesLogradasEncargado(req, res) {
    const { id } = req.params;
    const query = 'SELECT COUNT(*) FROM solucion WHERE idestadosolucion = 1 and idencargado = $1';
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

//Obtener cantidad de reportes cerrados de un usuario
async function getSolucionesNoLogradasEncargado(req, res) {
    const { id } = req.params;
    const query = 'SELECT COUNT(*) FROM solucion WHERE idestadosolucion = 2 and idencargado = $1';
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

//Obtener los detalles de una solucion
async function getDetallesSolucion(req, res) {
    const { id } = req.params;
    const { idencargado } = req.body;
    const query = 'SELECT S.idsolucion, R.idreporte, CONCAT(U.nombres,' + "' '" + ',U.apellidos) AS estudiante, ER.descripcioner AS estadoreporte, ES.descripciones AS estadosolucion, S.fecha , S.descripcions, R.evidencia FROM solucion S, reporte R, usuario U, estadosolucion ES, estadoreporte ER WHERE S.idreporte = $1 and S.idencargado = $2 and S.idreporte = R.idreporte and R.idusuario = U.idusuario and S.idestadosolucion = ES.idestadosolucion and R.idestadoreporte = ER.idestadoreporte';
    const values = [id, idencargado];
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

//funcion para ingresar una solucion
async function createSolucion(req, res) {
    const { idreporte, idencargado, idestadosolucion, fecha, descripcions } = req.body;
    const query = 'CALL enviarsolucion($1, $2, $3, $4, $5)';
    const values = [idreporte, idencargado, idestadosolucion, fecha, descripcions];
    try {
        const client = await pool.connect();
        const result = await client.query(query, values);
        client.release();
        res.status(200).json({ message: 'Se ejecuto correctamente!' })
    } catch (err) {
        res.status(500).json({ error: 'Error en el servidor!' });
    }
}

module.exports = { getSolucionesEncargado, getUltimasSolucionesEncargado, getSolucionesLogradasEncargado, getSolucionesNoLogradasEncargado, getDetallesSolucion, createSolucion }