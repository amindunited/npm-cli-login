var ncl = require("./login.js");

module.exports = async ( user, pass, email, registry, scope, quotes, configPath ) => {

  await new Promise((resolve, reject) => {

    var finalArgs = ncl.processArguments( user, pass, email, registry, scope, quotes, configPath);

    var response;
    var contents;
    var newContents;
  
    ncl.login(finalArgs, function (err, data) {
  
      if (err) {

        reject(err);

      } else {
  
        response = data;

        ncl.readFile(finalArgs, function (err, data) {
  
          if (err) {
            reject(err);
          } else {
  
            contents = data;
            newContents = ncl.generateFileContents(finalArgs, contents, response);
  
            ncl.writeFile(finalArgs, newContents, function(err) {
              if (err) {
                // let users know that it didn't work (could be prettier)
                reject(err);
              } else {
                resolve();
              }
            });
          }
        });
      }
    });

  });
};
