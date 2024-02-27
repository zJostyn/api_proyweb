const express = require('express');
const cors = require('cors')
const multer = require('multer');
const path = require('path');
const app = express();

var proyweb_routes = require('./routes/proyweb.routes');
const bodyParser = require('body-parser');

//mideware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//rutas
app.use('/api', proyweb_routes);

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const upload = multer({ storage: storage });

app.post('/upload', upload.single('file'), (req, res) => {
    res.status(200).json(req.file.path.split('uploads').pop());
    res.sendStatus(200);
});

app.get('/get-image/:filename', (req, res) => {
    const filename = req.params.filename;
    const imagePath = path.join(__dirname, 'uploads', filename);
    res.sendFile(imagePath);
});

//levantar el servidor en el puerto 3000
app.listen('3000');
console.log('server up localhost:3000');