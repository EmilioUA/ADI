//Emilio Prieto Uclés
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3000;

const usuarioRoutes = require('./routes/usuario.routes');
const comentarioRoutes = require('./routes/comentario.routes');
const maquinaRoutes = require('./routes/maquina.routes');
const zumoRoutes = require('./routes/zumo.routes');

const db = new sqlite3.Database('tiendaZumos.db'); 

//Transformar el cuerpo de cada petición a JSON
app.use(express.json());

// Aplicar CORS a todas las rutas
app.use(cors());

//Routing modular de los diferentes objetos
app.use('/usuario', usuarioRoutes);
app.use('/comentario', comentarioRoutes);
app.use('/maquina', maquinaRoutes);
app.use('/zumo', zumoRoutes);

const jwt = require('jwt-simple');

// Ruta para iniciar sesión
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const query = 'SELECT id, nombre, email, userStatus FROM usuarios WHERE email = ? AND contraseña = ?';
  const values = [email, password];

  db.get(query, values, (err, row) => {
    if (err) {
      return res.status(500).json({ message: 'Error en la base de datos' });
    }

    if (row) {
      const userId = row.id;
      const updateQuery = 'UPDATE usuarios SET secret = NULL, token = NULL WHERE id = ?';
      db.run(updateQuery, [userId], (err) => {
        if (err) {
          return res.status(500).json({ message: 'Error en la base de datos' });
        }

        const newSecret =  Date.now() + 'SoYuNaClAvEsUpErSeCrEtA' + Date.now();
        const payload = { email: row.email, userId: userId };
        const token = jwt.encode(payload, newSecret);

        const updateSecretQuery = 'UPDATE usuarios SET secret = ?, token = ? WHERE id = ?';
        const updateValues = [newSecret, token, userId];

        db.run(updateSecretQuery, updateValues, (err) => {
          if (err) {
            return res.status(500).json({ message: 'Error en la base de datos' });
          }

          res.json({ token, userId, userStatus: row.userStatus});
        });
      });
    } else {
      res.status(401).json({ message: 'Autenticación fallida' });
    }
  });
});


// Para subir ficheros
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'ficheros/'); 
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// Ruta para subir ficheros
app.post('/fileUpload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No se proporcionó ningún archivo' });
  }
  res.status(200).json({ message: 'Archivo subido con éxito' });
});


app.listen(port, () => {
  console.log(`Servidor en ejecución en el puerto ${port}`);
});
