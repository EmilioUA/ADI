const sqlite3 = require('sqlite3').verbose(); 
const db = new sqlite3.Database('tiendaZumos.db');

const jwt = require('jwt-simple');

function verificarToken(req, res, next) {
  const token = req.get('authorization');

  if (token) {
    const tokenParts = token.split(' ');
    if (tokenParts.length === 2 && tokenParts[0] === 'Bearer') {
      const tokenValue = tokenParts[1];
      
      const query = 'SELECT secret, token FROM usuarios WHERE id = ?';
      const usuarioId = req.get('UserId');

      db.get(query, [usuarioId], (err, row) => {
        if (err) {
          res.status(500).json({ errorMessage: 'Error en la base de datos' });
        } else if (row) {
          const storedSecret = row.secret;
          const storedToken = row.token;

          try {
            const payload = jwt.decode(tokenValue, storedSecret);
            if (tokenValue === storedToken) {
              req.user = payload.usuario;
              next();
            } else {
              res.status(401).json({ errorMessage: 'Token no válido' });
            }
          } catch (error) {
            res.status(401).json({ errorMessage: 'Token no válido' });
          }
        } else {
          res.status(401).json({ errorMessage: 'Usuario no encontrado en la base de datos' });
        }
      });
    } else {
      res.status(401).json({ errorMessage: 'Token no válido' });
    }
  } else {
    res.status(401).json({ errorMessage: 'Token no proporcionado' });
  }
}

module.exports = verificarToken;
