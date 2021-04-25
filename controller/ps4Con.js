const products = require('../models/products');
const pagination = require('../models/pagination');

// ps4 controller
const ps4 = async (req, res) => {
  let data;
  let page = parseInt(req.query.start); // PAGE NUMBER
  let previouspage = page - 5; // MOVE -5 ITEMS
  let nextpage = page + 5; // MOVE +5 ITEMS
  let max = await pagination.countAllPS4(); // COUNT ALL DATA
  max = max[0][0].max / 5; // COUNT ALL AND DIVIED BY 5

  try {
    // IF QUERY IS PASSED
    if (page) {
      data = await pagination.selectPagePS4(page, 5);
      res.render('ps4', {
        username: req.session.username, // username session
        data: data[0], // show paginated data(5 items)
        page: page, // current query number
        max: max, // count all data from db
        nextpage: nextpage < 20 ? page + 5 : undefined, // disable next page
        previouspage: previouspage >= 0 ? page - 5 : undefined, // disable prev page
        page_name: 'ps4', // page_name class(active)
      });
      // IF QUERY IS NOT PASSED
    } else {
      data = await products.selectAllPS4(); // SELECT THE FIRST 5 ITEMS
      nextpage = 5;
      res.render('ps4', {
        username: req.session.username, // username session
        data: data[0], // show paginated data(5 items)
        page: page, // current query number
        max: max, // count all data from db
        nextpage: nextpage, // next page
        previouspage: previouspage >= 0 ? page - 5 : undefined, // disable prev page (default)
        page_name: 'ps4', // page_name class(active)
      });
    }
  } catch (err) {
    console.log('ERROR: ', err);
  }
};

module.exports.ps4 = ps4;
