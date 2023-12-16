const sqlite3 = require('sqlite3');
const faker = require('faker');

const db = new sqlite3.Database('tiendaZumos.db');

const usuarioSchema = `
  CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    apellidos TEXT,
    edad INTEGER,
    email TEXT NOT NULL,
    contraseña TEXT NOT NULL,
    telefono INTEGER,
    userStatus INTEGER,
    secret TEXT,
    token TEXT,
    UNIQUE(email)
  )
`;

const comentarioSchema = `
  CREATE TABLE IF NOT EXISTS comentarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    text TEXT NOT NULL,
    usuarioId INTEGER,
    zumoId INTEGER
  )
`;

const zumoSchema = `
  CREATE TABLE IF NOT EXISTS zumos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tipo TEXT,
    descripcion TEXT
  )
`;

const maquinaSchema = `
  CREATE TABLE IF NOT EXISTS maquinas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    codigo INTEGER,
    cantidad INTEGER,
    averiada BOOLEAN,
    zumoId INTEGER
  )
`;

db.serialize(() => {
  db.run(usuarioSchema);
  db.run(comentarioSchema);
  db.run(zumoSchema);
  db.run(maquinaSchema);

 const insertUsuarios = db.prepare('INSERT INTO usuarios (nombre, apellidos, edad, email, contraseña, telefono, userStatus) VALUES (?, ?, ?, ?, ?, ?, ?)');
 const insertComentarios = db.prepare('INSERT INTO comentarios (text, usuarioId, zumoId) VALUES (?, ?, ?)');
 const insertZumos = db.prepare('INSERT INTO zumos (tipo, descripcion) VALUES (?, ?)');
 const insertMaquinas = db.prepare('INSERT INTO maquinas (codigo, cantidad, averiada, zumoId) VALUES (?, ?, ?, ?)');
 const usuario = [
  "Usuario",
  "Test",
  faker.datatype.number(90),
  "user@ua.es",
  "123",
  faker.phone.phoneNumber(),
  1,
];
insertUsuarios.run(usuario);
const provedor = [
  "provedor",
  "provedor",
  faker.datatype.number(90),
  "provedor@ua.es",
  "123",
  faker.phone.phoneNumber(),
  2,
];
insertUsuarios.run(provedor);
const admin = [
  "Admin",
  "Admin",
  faker.datatype.number(90),
  "admin@ua.es",
  "admin",
  faker.phone.phoneNumber(),
  3,
];
insertUsuarios.run(admin);

 for (let i = 0; i < 10; i++) {
   const usuario = [
     faker.name.firstName(),
     faker.name.lastName(),
     faker.datatype.number(90),
     faker.internet.email(),
     faker.internet.password(),
     faker.phone.phoneNumber(),
     faker.random.arrayElement([1, 2]),
   ];
   insertUsuarios.run(usuario);

   const comentario = [
     faker.lorem.sentence(),
     faker.datatype.number(10), 
     faker.datatype.number(10), 
   ];
   insertComentarios.run(comentario);

   const zumo = [
     faker.random.word(),
     faker.lorem.sentence(),
   ];
   insertZumos.run(zumo);

   const maquina = [
     faker.datatype.number(1000),
     faker.datatype.number(100),
     faker.datatype.boolean(),
     faker.datatype.number(10), 
   ];
   insertMaquinas.run(maquina);
 }

 insertUsuarios.finalize();
 insertComentarios.finalize();
 insertZumos.finalize();
 insertMaquinas.finalize();
});

db.close((err) => {
  if (err) {
    console.error('Error al cerrar la base de datos', err.message);
  } else {
    console.log('Base de datos creada correctamente.');
  }
});
