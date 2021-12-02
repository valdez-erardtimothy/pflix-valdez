let path = require('path');
let helpers = {}

let assetPath = process.env.ASSET_PATH;
let assetBaseUrl = process.env.ASSET_URL_BASE;
/**
 * @param {*} file express-fileupload file
 * @param {*} urlPath path relative to ASSETS_PATH folder
 */
helpers.saveUpload = async (file, urlPath) => {
  return new Promise((resolve, reject) => {
    let fileName = Date.now() + file.name;
    file.mv(path.resolve(assetPath, urlPath, fileName), (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(`${assetBaseUrl}/${urlPath}/${fileName}`);
      }
    });
  })
}


module.exports = helpers;