const path = require('path');

// cwd will be ../server (the folder above)
// path.resolve is used with __dirname (directory where server.js is) 
require('dotenv').config({ path: path.resolve(__dirname, "config/.env") });
const app = require('./express-app.js');

require('./connectDatabase.js')();

const APP_PORT = process.env.PORT || 5000;
app.listen(APP_PORT, function () {
  console.log(`pflix API is up on port ${APP_PORT}`);
});
