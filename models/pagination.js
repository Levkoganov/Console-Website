const mysql = require('../config/mysqlpool');

// XBOX //

// SELECT ALL (LIMIT)
let selectPage = (start, show) => {
  return mysql.execute('SELECT * FROM nodejs_project.xboxproducts LIMIT ?, ?', [
    start,
    show,
  ]);
};
// COUNT ALL
let countAll = () => {
  return mysql.execute(
    'SELECT COUNT(*) as max FROM nodejs_project.xboxproducts'
  );
};

// PS4 //

// SELECT ALL (LIMIT)
let selectPagePS4 = (start, show) => {
  return mysql.execute('SELECT * FROM nodejs_project.ps4products LIMIT ?, ?', [
    start,
    show,
  ]);
};

// COUNT ALL
let countAllPS4 = () => {
  return mysql.execute(
    'SELECT COUNT(*) as max FROM nodejs_project.ps4products'
  );
};

// XBOX //
module.exports.selectPage = selectPage;
module.exports.countAll = countAll;

// PS4 //
module.exports.selectPagePS4 = selectPagePS4;
module.exports.countAllPS4 = countAllPS4;
