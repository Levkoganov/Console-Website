const mysql = require('../config/mysqlpool');

// XBOX //

// SELECTALL (LIMIT 5)
let selectAll = () => {
  return mysql.execute('SELECT * FROM nodejs_project.xboxproducts LIMIT 5');
};

// SELECT BY ID
let selectByID = (id) => {
  return mysql.execute(
    `SELECT * FROM nodejs_project.xboxproducts WHERE idproducts = ${id}`
  );
};

// PS4 //

// SELECTALL (LIMIT 5)
let selectAllPS4 = (start, show) => {
  return mysql.execute('SELECT * FROM nodejs_project.ps4products LIMIT 5');
};

// SELECT BY ID
let selectByIDPS4 = () => {
  return mysql.execute(
    `SELECT * FROM nodejs_project.ps4products WHERE idproducts = ${id}`
  );
};

// XBOX//
module.exports.selectAll = selectAll;
module.exports.selectByID = selectByID;

// PS4 //
module.exports.selectAllPS4 = selectAllPS4;
module.exports.selectByIDPS4 = selectByIDPS4;
