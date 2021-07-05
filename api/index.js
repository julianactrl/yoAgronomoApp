const server = require('./src/app.js');
const { conn } = require('./src/db.js');
require("dotenv").config();
const port = process.env.PORT || 3001
// Syncing all the models at once.
conn.sync({ force: false }).then(() => { //cada vez que esta en false, se borra mi BS y se regenera. Cuando no tengo que cambiarlo más, PONERLO EN FALSE. Antes de subirlo al repo, ponerlo en false.
  server.listen(port, () => {
    console.log('%s listening at 3001 or not :D'); // eslint-disable-line no-console
  });
});

// "node index.js"
// "forever": "forever index.js",
// "start": "nodemon -L",  
//heroku pg:killall --app