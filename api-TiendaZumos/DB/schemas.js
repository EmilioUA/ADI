const usuarioSchema = {
    type: 'object',
    properties: {
      id: { type: 'integer', format: 'int64' },
      nombre: { type: 'string' },
      apellidos: { type: 'string' },
      edad: { type: 'integer', format: 'int64' },
      email: { type: 'string' },
      contraseña: { type: 'string' },
      telefono: { type: 'integer', format: 'int64' },
      userStatus: {
        type: 'integer',
        format: 'int32',
        description: '1 Cliente, 2 ClienteVIP, 3 Proveedor, 4 Administrador'
      },
    },
    required: ['id', 'nombre', 'email', 'contraseña', 'userStatus'],
  };
  
  const comentarioSchema = {
    type: 'object',
    properties: {
      id: { type: 'integer', format: 'int64' },
      text: { type: 'string' },
      usuarioId: { type: 'integer', format: 'int64' },
      zumoId: { type: 'integer', format: 'int64' },
    },
    required: ['text'],
  };
  
  const zumoSchema = {
    type: 'object',
    properties: {
      id: { type: 'integer', format: 'int64' },
      tipo: { type: 'object' },
      descripcion: { type: 'string' },
    },
    required: ['tipo', 'descripcion'],
  };
  
  const maquinaSchema = {
    type: 'object',
    properties: {
      id: { type: 'integer', format: 'int64' },
      codigo: { type: 'integer', format: 'int64' },
      cantidad: { type: 'integer', format: 'int64' },
      averiada: { type: 'boolean' },
      zumoId: { type: 'integer', format: 'int64' },
    },
    required: ['codigo', 'cantidad', 'averiada', 'zumoId'],
  };
  
  export default {
    usuarioSchema,
    comentarioSchema,
    zumoSchema,
    maquinaSchema,
  };