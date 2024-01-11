const { Router } = require('express');
const router = new Router();

var { getUsuarios, createUsuario, verificarUsuario, verCorreosRegistrados } = require('../controllers/usuarios.controllers');

var { getReportes, getReportesPorLab, getReportesUsuario, getUltimosReportesUsuario, getReportesAbiertosUsuario, getReportesCerradosUsuario, getReportesAbiertosUsuarioC, getReportesCerradosUsuarioC, getReportesUsuario, getDetallesReporteUsuario, getDetallesReporteSolucionUsuario, getDetallesReporte, getNumeroReporteNuevo, createReporte } = require('../controllers/reportes.controllers');

var { getSolucionesEncargado, getUltimasSolucionesEncargado, getSolucionesLogradasEncargado, getSolucionesNoLogradasEncargado, getDetallesSolucion, createSolucion } = require('../controllers/soluciones.controllers');

var { getTipoDaños } = require('../controllers/tipodaños.controllers');

var { getDetallesDaño } = require('../controllers/detallesdaños.controllers');

var { getUbicaciones } = require('../controllers/ubicaciones.controllers');

//rutas de los endpoint
router.get('/usuarios', getUsuarios);
router.post('/usuario', createUsuario)
router.post('/verificarusuario', verificarUsuario)
router.post('/verificarcorreo', verCorreosRegistrados)

router.get('/reportesab', getReportes);
router.get('/reportsabpl/:id', getReportesPorLab)
router.get('/reportesusuario/:id', getReportesUsuario);
router.get('/ultimosreportes/:id', getUltimosReportesUsuario)
router.get('/reportesabiertosusuario/:id', getReportesAbiertosUsuario);
router.get('/reportescerradosusuario/:id', getReportesCerradosUsuario);
router.get('/reportesabiertosusuarioc/:id', getReportesAbiertosUsuarioC);
router.get('/reportescerradosusuarioc/:id', getReportesCerradosUsuarioC);
router.post('/detallesreporteusuario/:id', getDetallesReporteUsuario);
router.post('/detallesreporteusuariosolu/:id', getDetallesReporteSolucionUsuario);
router.post('/detallesreporte', getDetallesReporte);
router.get('/numeroreportenuevo', getNumeroReporteNuevo);
router.post('/crearreporte', createReporte);

router.get('/solucionesen/:id', getSolucionesEncargado);
router.get('/ultimassolucionesen/:id', getUltimasSolucionesEncargado);
router.get('/solucioneslogradasen/:id', getSolucionesLogradasEncargado);
router.get('/solucionesnologradasen/:id', getSolucionesNoLogradasEncargado);
router.post('/detallessolucionencargado/:id', getDetallesSolucion);
router.post('/crearsolucion', createSolucion)

router.get('/tiposdanio', getTipoDaños);
router.get('/detallesdanio/:id', getDetallesDaño);
router.get('/ubicaciones', getUbicaciones);


module.exports = router;