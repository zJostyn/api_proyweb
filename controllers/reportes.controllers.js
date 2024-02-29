const { Pool } = require('pg');

const pool = new Pool({
    user: "zjostyn",
    host: "dpg-cnfuv7en7f5s73fbpn30-a",
    database: "proyweb_oabv",
    password: "zMsrZiyXpfaWy9kbA68QdlukDxaHivEe",
    port: 5432,
});

//Obtener todos los reportes abiertos
async function getReportes(req, res) {
    const query = 'SELECT R.idreporte, CONCAT(U.nombres,' + "' '" + ',U.apellidos) AS usuario, E.nombreequipo AS equipo, UBI.lugarubi AS ubicacion, DD.detalledanio AS detalledanio, ER.descripcionER AS estadoreporte, R.fecha, R.descripcion, R.evidencia FROM reporte R, usuario U, equipo E, ubicacion UBI, detalledanio DD, estadoreporte ER WHERE U.idusuario = R.idusuario and R.idubicacion = UBI.idubicacion and R.idequipo = E.idequipo and R.iddetalledanio = DD.iddetalledanio and R.idestadoreporte = ER.idestadoreporte and ER.descripcionER = ' + "'Abierto'" + 'ORDER BY R.idreporte';
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

//Obtener todos los reportes abiertos por laboratorio
async function getReportesPorLab(req, res) {
    const { id } = req.params;
    const query = 'SELECT R.idreporte, CONCAT(U.nombres,' + "' '" + ',U.apellidos) AS usuario, E.nombreequipo AS equipo, UBI.lugarubi AS ubicacion, DD.detalledanio AS detalledanio, ER.descripcionER AS estadoreporte, R.fecha, R.descripcion, R.evidencia FROM reporte R, usuario U, equipo E, ubicacion UBI, detalledanio DD, estadoreporte ER WHERE R.idubicacion = $1 and U.idusuario = R.idusuario and R.idubicacion = UBI.idubicacion and R.idequipo = E.idequipo and R.iddetalledanio = DD.iddetalledanio and R.idestadoreporte = ER.idestadoreporte and ER.descripcionER = ' + "'Abierto'" + ' ORDER BY R.idreporte';
    const values = [id];
    try {
        const client = await pool.connect();
        const result = await client.query(query, values);
        client.release();
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: 'Error en el servidor!' });
    }
}

//Obtener los reportes de un usuario
async function getReportesUsuario(req, res) {
    const { id } = req.params;
    const query = 'SELECT R.idreporte, CONCAT(U.nombres,' + "' '" + ',U.apellidos) AS usuario, E.nombreequipo AS equipo, UBI.lugarubi AS ubicacion, DD.detalledanio AS detalledanio, ER.descripcionER AS estadoreporte, R.fecha, R.descripcion, R.evidencia FROM reporte R, usuario U, equipo E, ubicacion UBI, detalledanio DD, estadoreporte ER WHERE R.idusuario = $1 and U.idusuario = R.idusuario and R.idubicacion = UBI.idubicacion and R.idequipo = E.idequipo and R.iddetalledanio = DD.iddetalledanio and R.idestadoreporte = ER.idestadoreporte ORDER BY R.idreporte';
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
async function getUltimosReportesUsuario(req, res) {
    const { id } = req.params;
    const query = 'SELECT R.idreporte, CONCAT(U.nombres,' + "' '" + ',U.apellidos) AS usuario, E.nombreequipo AS equipo, UBI.lugarubi AS ubicacion, DD.detalledanio AS detalledanio, ER.descripcionER AS estadoreporte, R.fecha, R.descripcion, R.evidencia FROM reporte R, usuario U, equipo E, ubicacion UBI, detalledanio DD, estadoreporte ER WHERE R.idusuario = $1 and U.idusuario = R.idusuario and R.idubicacion = UBI.idubicacion and R.idequipo = E.idequipo and R.iddetalledanio = DD.iddetalledanio and R.idestadoreporte = ER.idestadoreporte ORDER BY R.fecha DESC FETCH FIRST 3 ROWS ONLY';
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



//Obtener  reportes abiertos de un usuario
async function getReportesAbiertosUsuario(req, res) {
    const { id } = req.params;
    const query = 'SELECT * FROM reporte WHERE idestadoreporte = 1 and idusuario = $1';
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

//Obtener  reportes cerrados de un usuario
async function getReportesCerradosUsuario(req, res) {
    const { id } = req.params;
    const query = 'SELECT * FROM reporte WHERE idestadoreporte = 2 and idusuario = $1';
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
async function getReportesAbiertosUsuarioC(req, res) {
    const { id } = req.params;
    const query = 'SELECT COUNT(*) FROM reporte WHERE idestadoreporte = 1 and idusuario = $1';
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
async function getReportesCerradosUsuarioC(req, res) {
    const { id } = req.params;
    const query = 'SELECT COUNT(*) FROM reporte WHERE idestadoreporte = 2 and idusuario = $1';
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


//Obtener un reporte de un usuario
async function getDetallesReporteUsuario(req, res) {

    const { id } = req.params;
    const { idusuario } = req.body;
    const query = 'SELECT R.idreporte, CONCAT(U.nombres,' + "' '" + ',U.apellidos) AS usuario, E.nombreequipo AS equipo, UBI.lugarubi AS ubicacion, DD.detalledanio AS detalledanio, ER.descripcionER AS estadoreporte, R.fecha, R.descripcion, R.evidencia FROM reporte R, usuario U, equipo E, ubicacion UBI, detalledanio DD, estadoreporte ER WHERE R.idusuario = $2 and R.idreporte = $1 and U.idusuario = R.idusuario and R.idubicacion = UBI.idubicacion and R.idequipo = E.idequipo and R.iddetalledanio = DD.iddetalledanio and R.idestadoreporte = ER.idestadoreporte';
    const values = [id, idusuario];
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

//Obtener un reporte de un usuario
async function getDetallesReporteSolucionUsuario(req, res) {

    const { id } = req.params;
    const { idusuario } = req.body;
    const query = 'SELECT R.idreporte, S.descripcions AS descripcionsolucion, ES.descripciones AS estadosolucion, CONCAT(U.nombres,' + "' '" + ',U.apellidos) AS usuario, E.nombreequipo AS equipo, UBI.lugarubi AS ubicacion, DD.detalledanio AS detalledanio, ER.descripcionER AS estadoreporte, R.fecha, R.descripcion, R.evidencia FROM reporte R, solucion S, usuario U, equipo E, ubicacion UBI, detalledanio DD, estadoreporte ER, estadosolucion ES WHERE R.idusuario = $2 and R.idreporte = $1 and U.idusuario = S.idencargado and R.idubicacion = UBI.idubicacion and R.idequipo = E.idequipo and R.iddetalledanio = DD.iddetalledanio and R.idestadoreporte = ER.idestadoreporte AND R.idreporte = S.idreporte and S.idestadosolucion = ES.idestadosolucion;';
    const values = [id, idusuario];
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

//Obtener un reporte de un usuario
async function getDetallesReporte(req, res) {

    const { idreporte } = req.body;
    const query = 'SELECT R.idreporte, CONCAT(U.nombres,' + "' '" + ',U.apellidos) AS usuario, E.nombreequipo AS equipo, UBI.lugarubi AS ubicacion, DD.detalledanio AS detalledanio, ER.descripcionER AS estadoreporte, R.fecha, R.descripcion, R.evidencia FROM reporte R, usuario U, equipo E, ubicacion UBI, detalledanio DD, estadoreporte ER WHERE R.idreporte = $1 and U.idusuario = R.idusuario and R.idubicacion = UBI.idubicacion and R.idequipo = E.idequipo and R.iddetalledanio = DD.iddetalledanio and R.idestadoreporte = ER.idestadoreporte';
    const values = [idreporte];
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

//Obtener numero para el nuevo reporte
async function getNumeroReporteNuevo(req, res) {

    const query = 'SELECT count(idreporte)+1 AS idreporte FROM reporte';
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

//funcion para ingresar un reporte
async function createReporte(req, res) {
    const { idusuario, idequipo, idubicacion, iddetalledanio, idestadoreporte, fecha, descripcion, evidencia } = req.body;
    const query = 'INSERT INTO reporte (idusuario, idequipo, idubicacion, iddetalledanio, idestadoreporte, fecha, descripcion, evidencia) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)';
    const values = [idusuario, idequipo, idubicacion, iddetalledanio, idestadoreporte, fecha, descripcion, evidencia];
    try {
        const client = await pool.connect();
        const result = await client.query(query, values);
        client.release();
        if (result.rowCount > 0) {
            res.status(200).json({ message: 'Se guardo el dato correctamente!' })
        } else {
            res.status(400).json({ message: 'No se pudo guardar el dato!' })
        }
    } catch (err) {
        res.status(500).json({ error: 'Error en el servidor!' });
    }
}

module.exports = { getReportes, getReportesPorLab, getReportesUsuario, getUltimosReportesUsuario, getReportesAbiertosUsuario, getReportesCerradosUsuario, getReportesAbiertosUsuarioC, getReportesCerradosUsuarioC, getDetallesReporteUsuario, getDetallesReporte, getNumeroReporteNuevo, createReporte, getDetallesReporteSolucionUsuario }