/**
 * Main application routes
 */

'use strict';



module.exports = function(app) {

   app.route('/data/*')
    .get(function(req, res) {
	  res.header("Content-Type", "application/json");
      res.sendFile('/data/names.json', {"root": app.get('appPath')});
  });
  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
	  //res.header("Content-Type", "application/json");
      res.sendFile('index.html', {"root": app.get('appPath')});
  });
};
