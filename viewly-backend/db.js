const mariadb = require('mariadb');

// here we create a new connection pool
const pool = mariadb.createPool({
  host: "127.0.0.1", 
  user: "root", 
  password: "clefan05",
  database: "viewly",
  connectionLimit: 2
});

// here we are exposing the ability to creating new connections
module.exports={
    getConnection: function(){
      return new Promise(function(resolve,reject){
        pool.getConnection().then(function(connection){
          resolve(connection);
        }).catch(function(error){
          reject(error);
        });
      });
    }
  }