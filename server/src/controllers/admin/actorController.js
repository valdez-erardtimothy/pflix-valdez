const actor = require('../../models/actor.js');
const { saveUpload } = require('../../utils/assetHandler');

let actorController = {};
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

actorController.read = async (req, res, next) => {
  actor.findById(req.params.id, function (err, actor) {
    if (err) return next(err)
    res.status(200).send({ actor: actor });

  });
}
module.exports = actorController