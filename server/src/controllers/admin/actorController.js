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
  let imgPaths = [];
  let fields = req.body;
  // handle uploads
  let uploads = req.files?.images;
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
  let imgPaths = [];
  let fields = req.body;
  let uploads = req.files?.images;
  actor.findById(req.params.id, async function (findError, existingActor) {
    // let mongoose handle errors
    if (findError) {
      return next(findError);
    }

    // handle uploads
    if (uploads !== undefined) {
      // delete existing pics
      if (existingActor?.images?.length > 0) {
        await Promise.all(
          existingActor.images.map(
            async (url) => { await removeUploaded(url); }
          )
        );
      }
      // save all uploads
      if (!Array.isArray(uploads)) {
        uploads = [uploads]
      }
      await Promise.all(uploads.map(async (img) => {
        imgPaths.push(await saveUpload(img, 'uploads/actors'));
      }));
      // add image URL array to document
      fields = { ...fields, images: imgPaths };
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

actorController.destroy = async (req, res) => {
  let { id } = req.params;
  actor.findOneAndDelete({ _id: id }, function (err, data) {
    if (err) {
    }
    res.status(200).send({ actor: data });
  });
};

module.exports = actorController;