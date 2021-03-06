let path = require('path');
let fsPromises = require('fs/promises');
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

helpers.savefromURL = async (imageURL, newUrlPath, imageName) => {
  const writer = createWriteStream(
    path.resolve(assetPath, newUrlPath, fileName)
  );

  return Axios({
    method: 'get',
    url: imageURL,
    responseType: 'stream',
  }).then(response => {


    return new Promise((resolve, reject) => {
      response.data.pipe(writer);
      let error = null;
      writer.on('error', err => {
        error = err;
        writer.close();
        reject(err);
      });
      writer.on('close', () => {
        if (!error) {
          resolve(`${assetBaseUrl}/${newUrlPath}/${imageName}`);
        }
      });
    });
  });
}

/**
 * 
 * @param {*} urlPath includes filename already 
 */
helpers.removeUploaded = async (urlPath) => {
  let stripPathFromURL = "api/assets/";

  let strippedUrl = urlPath.replace(stripPathFromURL, '');
  console.debug("asset path", assetPath);
  console.debug("urlpath:", urlPath)
  console.debug("stripping path", stripPathFromURL);
  console.debug("stripped url", strippedUrl)
  console.debug("unlink path:", `${assetPath}/${strippedUrl}`)
  return fsPromises.unlink(`${assetPath}/${strippedUrl}`)
}




module.exports = helpers;