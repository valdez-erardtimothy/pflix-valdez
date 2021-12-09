const actor = require('../../models/actor.js');
const { saveUpload } = require('../../utils/assetHandler');
const actorController = {};

actorController.list = async (req, res, next) => {
  actor.find({}, function (err, actors) {
    if (err) {
      return next(err);
    }
    if (actors) {
      res.status(200).json({ actors: actors });
    }
  }).sort({ name: 1 });
};

actorController.create = async (req, res) => {
  let uploads = req.files?.images;
  let imgPaths = [];
  let fields = req.body;
  if (uploads !== undefined) {
    if (!Array.isArray(uploads)) {
      uploads = [uploads]
    }
    await Promise.all(uploads.map(async (img) => {
      imgPaths.push(await saveUpload(img, 'uploads/actors'));
    }));
  }
  const newActor = await actor.create({ ...fields, images: imgPaths });
  return res.status(201).json({ actor: newActor });
}

module.exports = actorController