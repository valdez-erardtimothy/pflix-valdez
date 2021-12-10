const actor = require('../../models/actor.js');
const { saveUpload, removeUploaded } = require('../../utils/assetHandler');

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

actorController.create = async (req, res, next) => {
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
  try {

    const newActor = await actor.create({ ...fields, images: imgPaths });
    return res.status(201).json({ actor: newActor });
  } catch (e) { return next(e) }
}

actorController.read = async (req, res, next) => {
  actor.findById(req.params.id, function (err, actor) {
    if (err) return next(err)
    res.status(200).send({ actor: actor });

  });
}

actorController.update = async (req, res) => {
  let uploads = req.files?.images;
  let imgPaths = [];
  let fields = req.body;
  actor.findById(req.params.id, async function (findError, existingActor) {
    if (findError) {
      return next(findError);
    }
    if (uploads !== undefined) {
      // delete existing pics
      if (existingActor?.images?.length > 0) {
        await Promise.all(
          existingActor.images.map(
            async (url) => { await removeUploaded(url); }
          )
        );
      }
      // 
      if (!Array.isArray(uploads)) {
        uploads = [uploads]
      }
      await Promise.all(uploads.map(async (img) => {
        imgPaths.push(await saveUpload(img, 'uploads/actors'));
      }));
      console.debug('fields before adding img', fields);
      fields = { ...fields, images: imgPaths };
      console.debug('fields before after img', fields);
    }
    existingActor.overwrite(fields);
    try {
      const updated = await existingActor.save();
      return res.status(200).send({ actor: updated });
    } catch (updateError) {
      return next(updateError);
    }
  });
}
module.exports = actorController