require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");

const {
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_NAME,
  DATABASE_URL_LOCAL,
  DATABASE_URL,
} = process.env;
dbRDS = false;

const sequelize = new Sequelize(`${DATABASE_URL}?sslmode=require`, { //?sslmode=require
  ssl: true,
  protocol: "postgres",
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});
// const sequelize = new Sequelize(`${DATABASE_URL_LOCAL}`, {
//   // ssl: true,
//   protocol: "postgres",
//   logging: false
// });


const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring

const {
  User,
  Empresa,
  Lote,
  ManejoDeLote,
  Post,
  Role,
  Transporte,
  Stock,
  Tarea,
  ClasificacionDeGastos,
  Gastos,
} = sequelize.models;

// Aca vendrian las relaciones
// Product.hasMany(Reviews);
User.hasMany(Empresa);
Empresa.belongsTo(User);
Empresa.hasMany(Lote);
Empresa.hasMany(Transporte);
Empresa.hasMany(ClasificacionDeGastos);
ClasificacionDeGastos.belongsTo(Empresa);
ClasificacionDeGastos.hasMany(Gastos);
Gastos.belongsTo(ClasificacionDeGastos);
Lote.belongsTo(Empresa);
Lote.hasMany(ManejoDeLote);
ManejoDeLote.belongsTo(Lote);
Post.belongsTo(User, { as: "author", foreignKey: "userId" });
Role.belongsToMany(User, {
  as: "users",
  through: "user_role",
  foreignKey: "role_id",
});
User.hasMany(Post, { as: "posts", foreignKey: "userId" });

Transporte.belongsTo(Empresa);

User.belongsToMany(Role, {
  as: "roles",
  through: "user_role",
  foreignKey: "user_id",
});
Stock.belongsTo(Empresa);
Empresa.hasMany(Tarea);
Tarea.belongsTo(Empresa);

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
