// usuario.controller.js
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('tiendaZumos.db');

exports.createUser = (req, res) => {
    const { nombre, apellidos, edad, email, contraseña, telefono, userStatus } = req.body;

    if (!nombre || !email || !contraseña || !userStatus) {
      return res.status(400).json({ errorMessage: 'Los campos "nombre", "email", "contraseña" y "userStatus" son obligatorios' });
    }
  
    const query = db.prepare('INSERT INTO usuarios (nombre, apellidos, edad, email, contraseña, telefono, userStatus) VALUES (?, ?, ?, ?, ?, ?, ?)');
  
    query.run(nombre, apellidos, edad, email, contraseña, telefono, userStatus, function (err) {
      if (err) {
        if (err.errno === 19 && err.message.includes('UNIQUE constraint failed: usuarios.email')) {
          return res.status(409).json({ errorMessage: 'El correo electrónico ya está registrado.' });
        } else {
          return res.status(500).json({ errorMessage: 'Error al crear el usuario' });
        }
      }
  
      res.status(201).json({ message: 'Usuario creado con éxito', usuario: { id: this.lastID, nombre, apellidos, edad, email, contraseña, telefono, userStatus } });
    });
    query.finalize();
};

exports.getUsersList = (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const resultsPerPage = parseInt(req.query.resultsPerPage) || 100;
    const startIndex = (page - 1) * resultsPerPage;
  
    const query = db.prepare('SELECT * FROM usuarios LIMIT ? OFFSET ?');
    query.all(resultsPerPage, startIndex, (err, usuarios) => {
      if (err) {
        return res.status(500).json({ errorMessage: 'Error al obtener la lista de usuarios' });
      }
  
      const totalUsuarios = usuarios.length;
      const totalPaginas = Math.ceil(totalUsuarios / resultsPerPage);
  
      const baseUrl = req.protocol + '://' + req.get('host') + req.originalUrl.split('?')[0];
      const pageAnterior = page > 1 ? `${baseUrl}?page=${page - 1}&resultsPerPage=${resultsPerPage}` : "Página inexistente";
      const paginaSiguiente = usuarios.length === resultsPerPage ? `${baseUrl}?page=${page + 1}&resultsPerPage=${resultsPerPage}` : "Página inexistente";
  
      const metadatos = {
        TotalDeResultados: totalUsuarios,
        NúmeroDeResultadosPáginaActual: usuarios.length,
        TotalDePaginas: totalPaginas,
        URLDevolveríaPaginaAnterior: pageAnterior,
        URLDevolveríaPaginaSiguiente: paginaSiguiente,
      };
  
      const response = {
        Usuarios: usuarios,
        metadatos: metadatos,
      };
  
      res.status(200).json(response);
    });
    query.finalize();
};

exports.getUserById = (req, res) => {
    const id = parseInt(req.params.id);
  
    if (isNaN(id)) {
      return res.status(400).json({ errorMessage: 'ID de usuario no válido' });
    }
  
    const sql = 'SELECT * FROM usuarios WHERE id = ?';
    
    db.get(sql, [id], (err, usuario) => {
      if (err) {
        return res.status(500).json({ errorMessage: 'Error en la consulta' });
      }
  
      if (!usuario) {
        return res.status(404).json({ errorMessage: 'Usuario no encontrado' });
      }
  
      res.status(200).json({ usuario });
    });
};

exports.updateUser = (req, res) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ errorMessage: 'ID de usuario no válido' });
    }
  
    const { nombre, apellidos, edad, email, contraseña, telefono, userStatus } = req.body;
  
    const sql = 'UPDATE usuarios SET nombre = ?, apellidos = ?, edad = ?, email = ?, contraseña = ?, telefono = ?, userStatus = ? WHERE id = ?';
  
    db.run(sql, [nombre, apellidos, edad, email, contraseña, telefono, userStatus, id], function (err) {
      if (err) {
        return res.status(500).json({ errorMessage: 'Error al actualizar el usuario' });
      }
  
      const changes = this.changes;
  
      if (changes === 0) {
        return res.status(404).json({ errorMessage: 'Usuario no encontrado' });
      }
  
      res.status(200).json({message: 'Usuario actualizado exitosamente', usuario: req.body });
    });
};

exports.deleteUser = (req, res) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ errorMessage: 'ID de usuario no válido' });
    }
  
    const sql = 'DELETE FROM usuarios WHERE id = ?';
  
    db.run(sql, id, function (err) {
      if (err) {
        return res.status(500).json({ errorMessage: 'Error al eliminar el usuario' });
      }
  
      const changes = this.changes;
  
      if (changes === 0) {
        return res.status(404).json({ errorMessage: 'Usuario no encontrado' });
      }
  
      res.json({ message: 'Usuario eliminado correctamente' });
    });
};
