// comentario.controller.js
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('tiendaZumos.db'); 

exports.createComentario = (req, res) => {
  const { text, usuarioId, zumoId } = req.body;

  if (!text) {
    return res.status(400).json({ errorMessage: 'El campo "text" es obligatorio' });
  }

  const sql = 'INSERT INTO comentarios (text, usuarioId, zumoId) VALUES (?, ?, ?)';

  db.run(sql, [text, usuarioId, zumoId], function (err) {
    if (err) {
      return res.status(500).json({ errorMessage: 'Error al crear el comentario' });
    }

    const nuevoComentario = {
      id: this.lastID,
      text,
      usuarioId,
      zumoId,
    };

    res.status(201).json({ message: 'Comentario creado exitosamente', comentario: nuevoComentario });
  });
};

exports.getComentariosLista = (req, res) => {
    const page = parseInt(req.query.page) || 1;
  const resultsPerPage = parseInt(req.query.resultsPerPage) || 100;
  const startIndex = (page - 1) * resultsPerPage;

  const query = db.prepare('SELECT * FROM comentarios LIMIT ? OFFSET ?');
  query.all(resultsPerPage, startIndex, (err, comentarios) => {
    if (err) {
      return res.status(500).json({ errorMessage: 'Error al obtener la lista de comentarios' });
    }

    const totalComentarios = comentarios.length;
    const totalPaginas = Math.ceil(totalComentarios / resultsPerPage);

    const baseUrl = req.protocol + '://' + req.get('host') + req.originalUrl.split('?')[0];
    const pageAnterior = page > 1 ? `${baseUrl}?page=${page - 1}&resultsPerPage=${resultsPerPage}` : "Página inexistente";
    const paginaSiguiente = comentarios.length === resultsPerPage ? `${baseUrl}?page=${page + 1}&resultsPerPage=${resultsPerPage}` : "Página inexistente";

    const metadatos = {
      TotalDeResultados: totalComentarios,
      NúmeroDeResultadosPáginaActual: comentarios.length,
      TotalDePaginas: totalPaginas,
      URLDevolveríaPaginaAnterior: pageAnterior,
      URLDevolveríaPaginaSiguiente: paginaSiguiente,
    };

    const response = {
      Comentarios: comentarios,
      metadatos: metadatos,
    };

    res.status(200).json(response);
  });
  query.finalize();
};

exports.getComentarioById = (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ errorMessage: 'ID de comentario no válido' });
    }
  
    const query = db.prepare('SELECT * FROM comentarios WHERE id = ?');
    query.get(id, (err, comentario) => {
      if (err) {
        return res.status(500).json({ errorMessage: 'Error al obtener el comentario' });
      }
  
      if (!comentario) {
        return res.status(404).json({ errorMessage: 'Comentario no encontrado' });
      }
  
      res.status(200).json({ comentario: comentario });
    });
    query.finalize();
};

exports.getComentariosByUsuarioId = (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ errorMessage: 'ID de usuario asociado a comentario no válido' });
    }
  
    const query = db.prepare('SELECT * FROM comentarios WHERE usuarioId = ?');
    query.all(id, (err, comentariosRelacionados) => {
      if (err) {
        return res.status(500).json({ errorMessage: 'Error al obtener comentarios relacionados con el usuario' });
      }
  
      if (comentariosRelacionados.length === 0) {
        return res.status(404).json({ errorMessage: 'No se encontraron comentarios para el usuario especificado' });
      }
  
      res.status(200).json(comentariosRelacionados);
    });
    query.finalize();
};

exports.getComentariosByZumoId = (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ errorMessage: 'ID de zumo asociado a comentario no válido' });
    }
  
    const query = db.prepare('SELECT * FROM comentarios WHERE zumoId = ?');
    query.all(id, (err, comentariosRelacionados) => {
      if (err) {
        return res.status(500).json({ errorMessage: 'Error al obtener comentarios relacionados con el zumo' });
      }
  
      if (comentariosRelacionados.length === 0) {
        return res.status(404).json({ errorMessage: 'No se encontraron comentarios para el zumo especificado' });
      }
  
      res.status(200).json(comentariosRelacionados);
    });
    query.finalize();
};

exports.updateComentario = (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ errorMessage: 'ID de comentario no válido' });
    }

    const { text } = req.body;

    const query = db.prepare('UPDATE comentarios SET text = ? WHERE id = ?');
    query.run([text, id], function (err) {
        if (err) {
            return res.status(500).json({ errorMessage: 'Error al actualizar el comentario' });
        }

        if (this.changes === 0) {
            return res.status(404).json({ errorMessage: 'Comentario no encontrado' });
        }

        res.status(200).json({ message: 'Comentario actualizado exitosamente' });
    });
    query.finalize();
};

exports.deleteComentario = (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ errorMessage: 'ID de comentario no válido' });
    }
  
    const query = db.prepare('DELETE FROM comentarios WHERE id = ?');
    query.run(id, function (err) {
      if (err) {
        return res.status(500).json({ errorMessage: 'Error al eliminar el comentario' });
      }
  
      if (this.changes === 0) {
        return res.status(404).json({ errorMessage: 'Comentario no encontrado' });
      }
  
      res.json({ message: 'Comentario eliminado correctamente' });
    });
    query.finalize();
};
