var express = require('express');
var router = express.Router();
const fs = require('fs');
const routesPath = `${__dirname}/`;
const { removeExtensionFromFile } = require('../middlewares/utils')


// Loop routes path and loads every file as a route except this file and Auth route
fs.readdirSync(routesPath).filter(file => {
  // Take filename and remove last part (extension)
  const routeFile = removeExtensionFromFile(file);
  // Prevents loading of this file and auth file
  return routeFile !== 'index'
    ? router.use (`/${routeFile}`, require(`./${routeFile}`))
    : ''
})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200).send( { title: 'Express' });
});

module.exports = router;
