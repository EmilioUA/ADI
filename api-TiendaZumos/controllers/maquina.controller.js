// maquina.controller.js

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('tiendaZumos.db');

exports.createMaquina = (req, res) => {
    const { codigo, cantidad, averiada, zumoId } = req.body;

    if (!codigo || cantidad === null || cantidad === undefined || !zumoId || averiada === null || averiada === undefined) {
      return res.status(400).json({ errorMessage: 'Los campos "codigo", "cantidad", "averiada" y "zumoId" son obligatorios' });
    }
  
    const query = db.prepare('INSERT INTO maquinas (codigo, cantidad, averiada, zumoId) VALUES (?, ?, ?, ?)');
    query.run(codigo, cantidad, averiada, zumoId, function (err) {
      if (err) {
        return res.status(500).json({ errorMessage: 'Error al crear la máquina' });
      }
  
      const nuevaMaquina = {
        id: this.lastID,
        codigo,
        cantidad,
        averiada,
        zumoId,
      };
  
      res.status(201).json({ message: 'Máquina creada exitosamente', maquina: nuevaMaquina });
    });
    query.finalize();
};

exports.getMaquinasLista = (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const resultsPerPage = parseInt(req.query.resultsPerPage) || 5;
    const startIndex = (page - 1) * resultsPerPage;
  
    const query = db.prepare('SELECT * FROM maquinas LIMIT ? OFFSET ?');
    query.all(resultsPerPage, startIndex, (err, maquinas) => {
      if (err) {
        return res.status(500).json({ errorMessage: 'Error al obtener la lista de máquinas' });
      }
  
      const totalMaquinas = maquinas.length;
      const totalPaginas = Math.ceil(totalMaquinas / resultsPerPage);
  
      const baseUrl = req.protocol + '://' + req.get('host') + req.originalUrl.split('?')[0];
      const pageAnterior = page > 1 ? `${baseUrl}?page=${page - 1}&resultsPerPage=${resultsPerPage}` : "Página inexistente";
      const paginaSiguiente = maquinas.length === resultsPerPage ? `${baseUrl}?page=${page + 1}&resultsPerPage=${resultsPerPage}` : "Página inexistente";
  
      const metadatos = {
        TotalDeResultados: totalMaquinas,
        NúmeroDeResultadosPáginaActual: maquinas.length,
        TotalDePaginas: totalPaginas,
        URLDevolveríaPaginaAnterior: pageAnterior,
        URLDevolveríaPaginaSiguiente: paginaSiguiente,
      };
  
      const response = {
        Maquinas: maquinas,
        metadatos: metadatos,
      };
  
      res.status(200).json(response);
    });
    query.finalize();
};

exports.getMaquinaById = (req, res) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ errorMessage: 'ID de maquina no válido' });
    }
  
    const query = db.prepare('SELECT * FROM maquinas WHERE id = ?');
    query.get(id, (err, maquina) => {
      if (err) {
        return res.status(500).json({ errorMessage: 'Error al obtener la máquina' });
      }
  
      if (!maquina) {
        return res.status(404).json({ errorMessage: 'Maquina no encontrada' });
      }
  
      res.status(200).json({ maquina });
    });
  
    query.finalize();
};

exports.updateMaquina = (req, res) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ errorMessage: 'ID de maquina no válido' });
    }
  
    const { codigo, cantidad, zumoId } = req.body;
  
    const query = db.prepare('UPDATE maquinas SET codigo = ?, cantidad = ?, zumoId = ? WHERE id = ?');
    query.run(codigo, cantidad, zumoId, id, function (err) {
      if (err) {
        return res.status(500).json({ errorMessage: 'Error al actualizar la máquina en la base de datos' });
      }
  
      const changes = this.changes;
      query.finalize();
  
      if (changes === 0) {
        return res.status(404).json({ errorMessage: 'Máquina no encontrada' });
      }
  
      const maquinaActualizada = { id, codigo, cantidad, zumoId };
      res.status(200).json({ maquina: maquinaActualizada });
    });
};

exports.toggleAveriada = (req, res) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ errorMessage: 'ID de máquina no válido' });
    }
  
    const query = db.prepare('SELECT averiada FROM maquinas WHERE id = ?');
    query.get(id, (err, maquina) => {
      if (err) {
        return res.status(500).json({ errorMessage: 'Error al obtener el estado de averiada de la máquina' });
      }
  
      if (!maquina) {
        return res.status(404).json({ errorMessage: 'Máquina no encontrada' });
      }
  
      const nuevoEstadoAveriada = !maquina.averiada;
  
      const updateQuery = db.prepare('UPDATE maquinas SET averiada = ? WHERE id = ?');
      updateQuery.run(nuevoEstadoAveriada, id, function (updateErr) {
        if (updateErr) {
          return res.status(500).json({ errorMessage: 'Error al actualizar el estado de averiada de la máquina en la base de datos' });
        }
  
        const maquinaActualizada = { id, averiada: nuevoEstadoAveriada };
        updateQuery.finalize();
        res.status(200).json({ maquina: maquinaActualizada });
      });
    });
    query.finalize();
};

exports.rellenarMaquina = (req, res) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ errorMessage: 'ID de máquina no válido' });
    }
  
    const query = db.prepare('UPDATE maquinas SET cantidad = 100 WHERE id = ?');
    query.run(id, function (err) {
      if (err) {
        return res.status(500).json({ errorMessage: 'Error al rellenar la máquina en la base de datos' });
      }
  
      const maquinaActualizada = { id, cantidad: 100 };
      query.finalize();
      res.status(200).json({ maquina: maquinaActualizada });
    });
};

exports.deleteMaquina = (req, res) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ errorMessage: 'ID de máquina no válido' });
    }
  
    const query = db.prepare('DELETE FROM maquinas WHERE id = ?');
    query.run(id, function (err) {
      if (err) {
        return res.status(500).json({ errorMessage: 'Error al eliminar la máquina de la base de datos' });
      }
  
      query.finalize();
      res.json({ message: 'Máquina eliminada correctamente' });
    });
};
