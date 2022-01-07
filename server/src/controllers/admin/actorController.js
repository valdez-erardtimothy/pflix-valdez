const actor = require('../../models/actor.js');
const { saveUpload, removeUploaded } = require('../../utils/assetHandler');
const filmography = require('../../models/filmography.js');
const removeDuplicate = require('../../utils/removeDuplicate.js');

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
  try {
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

    const newActor = await actor.create({ ...fields, images: imgPaths });
    return res.status(201).json({ actor: newActor });
  } catch (e) { return next(e) }
}


actorController.read = async (req, res, next) => {
  actor.findById(req.params.id, function (err, actor) {
    if (err) return next(err);
    filmography.find({ actor: actor._id })
      .populate('show')
      .exec(function (err, films) {
        if (err) return next(err);

        actor = {
          ...actor.toObject(),
          filmography: films
        }
        console.debug('actor read with filmography:', actor);
        res.status(200).send({ actor: actor });
      })
  });
}
// update the entry
actorController.update = async (req, res, next) => {
  let imgPaths = [];
  let fields = req.body;
  let uploads = req.files?.images;
  actor.findById(req.params.id, async function (findError, existingActor) {
    // let mongoose handle errors
    if (findError) {
      return next(findError);
    }
    console.debug('request body:', req.body);
    // merge filmography fields into one array of objects
    let filmographyData = [];
    if (fields['characters[]'] && fields['actors[]'] && fields['shows[]']) {
      if (Array.isArray(fields['characters[]'])) {
        for (let i = 0; i < fields['shows[]'].length; i++) {
          console.debug(
            "processing filmography entry: ",
            fields['characters[]'][i],
            fields['actors[]'][i],
            fields['shows[]'][i]
          )
          filmographyData.push({
            character: fields['characters[]'][i],
            actor: fields['actors[]'][i],
            show: fields['shows[]'][i]
          })
        }
      } else {
        filmographyData.push({
          character: fields['characters[]'],
          actor: fields['actors[]'],
          show: fields['shows[]']
        })
      }
    }
    filmographyData = removeDuplicate(filmographyData, 'show')

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
    try {
      // const updated = await existingActor.save();
      let updated = await actor.findByIdAndUpdate(existingActor._id, fields);
      await filmography.deleteMany({ actor: existingActor._id });
      await filmography.insertMany(filmographyData);
      return res.status(200).send({ actor: updated });
    } catch (updateError) {
      return next(updateError);
    }
  });
}

actorController.destroy = async (req, res) => {
  let { id } = req.params;
  actor.findOneAndDelete({ _id: id }, async function (err, data) {
    if (err) {
      return next(err)
    }
    await filmography.deleteMany({ actor: id })
    res.status(200).send({ actor: data });
  });
};

module.exports = actorController;