const App = require('./App')
const mongoose = require('mongoose');

const config = require('./config');

mongoose.connect(config.db, (err, res)=>{
    if(err){
        console.err("fallo la conexion con la base de datos");
        throw err;
    }
    console.log("conexion con la base de datos exitosa");

    App.listen(config.port, function() {
        console.log('App listening on port: ' + config.port);
    });

});
