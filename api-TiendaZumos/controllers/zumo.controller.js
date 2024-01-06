// zumo.controller.js

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('tiendaZumos.db');

exports.createZumo = (req, res) => {
    const { tipo, descripcion } = req.body;

    if (!tipo || !descripcion) {
      return res.status(400).json({ errorMessage: 'Los campos "tipo" y "descripcion" son obligatorios' });
    }
  
    const query = db.prepare('INSERT INTO zumos (tipo, descripcion) VALUES (?, ?)');
    query.run(tipo, descripcion, function (err) {
      if (err) {
        return res.status(500).json({ errorMessage: 'Error al crear el zumo' });
      }
  
      const nuevoZumo = {
        id: this.lastID,
        tipo,
        descripcion,
      };
  
      res.status(201).json({ message: 'Zumo creado exitosamente', zumo: nuevoZumo });
    });
    query.finalize();
};

exports.getZumosLista = (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const resultsPerPage = parseInt(req.query.resultsPerPage) || 100;
    const startIndex = (page - 1) * resultsPerPage;
  
    const query = db.prepare('SELECT * FROM zumos LIMIT ? OFFSET ?');
    query.all(resultsPerPage, startIndex, (err, zumos) => {
      if (err) {
        return res.status(500).json({ errorMessage: 'Error al obtener la lista de zumos' });
      }
  
      const totalZumos = zumos.length;
      const totalPaginas = Math.ceil(totalZumos / resultsPerPage);
  
      const baseUrl = req.protocol + '://' + req.get('host') + req.originalUrl.split('?')[0];
      const pageAnterior = page > 1 ? `${baseUrl}?page=${page - 1}&resultsPerPage=${resultsPerPage}` : "Página inexistente";
      const paginaSiguiente = zumos.length === resultsPerPage ? `${baseUrl}?page=${page + 1}&resultsPerPage=${resultsPerPage}` : "Página inexistente";
  
      const metadatos = {
        TotalDeResultados: totalZumos,
        NúmeroDeResultadosPáginaActual: zumos.length,
        TotalDePaginas: totalPaginas,
        URLDevolveríaPaginaAnterior: pageAnterior,
        URLDevolveríaPaginaSiguiente: paginaSiguiente,
      };
  
      const response = {
        Zumos: zumos,
        metadatos: metadatos,
      };
  
      res.status(200).json(response);
    });
    query.finalize();};

exports.getZumoById = (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ errorMessage: 'ID de zumo no válido' });
    }
  
    const query = db.prepare('SELECT * FROM zumos WHERE id = ?');
    query.get(id, (err, zumo) => {
      if (err) {
        return res.status(500).json({ errorMessage: 'Error al obtener el zumo' });
      }
  
      if (!zumo) {
        return res.status(404).json({ errorMessage: 'Zumo no encontrado' });
      }
  
      res.status(200).json({ zumo: zumo });
    });
    query.finalize();
};

exports.updateZumo = (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ errorMessage: 'ID de zumo no válido' });
    }
  
    const { tipo, descripcion } = req.body;
  
    if (!tipo || !descripcion) {
      return res.status(400).json({ errorMessage: 'Los campos "tipo" y "descripcion" son obligatorios' });
    }
  
    const query = db.prepare('UPDATE zumos SET tipo = ?, descripcion = ? WHERE id = ?');
    query.run(tipo, descripcion, id, (err) => {
      if (err) {
        return res.status(500).json({ errorMessage: 'Error al actualizar el zumo' });
      }
  
      res.status(200).json({ zumo: { id, tipo, descripcion } });
    });
    query.finalize();
};

exports.deleteZumo = (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ errorMessage: 'ID de zumo no válido' });
    }
  
    const query = db.prepare('DELETE FROM zumos WHERE id = ?');
    query.run(id, function (err) {
      if (err) {
        return res.status(500).json({ errorMessage: 'Error al eliminar el zumo' });
      }
  
      if (this.changes === 0) {
        return res.status(404).json({ errorMessage: 'Zumo no encontrado' });
      }
  
      res.json({ message: 'Zumo eliminado correctamente' });
    });
    query.finalize();
};
