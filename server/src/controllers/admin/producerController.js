const producer = require("../../models/producer");
const { saveUpload } = require("../../utils/assetHandler");

const producerController = {};
producerController.list = async (req, res, next) => {
  producer.find({}, function (err, producers) {
    if (err) {
      return next(err);
    }
    return res.status(200).json({ producers });
  })
}

producerController.read = async (req, res, next) => {
  let { id } = req.params;
  producer.findById(id, function (err, data) {
    if (err) return next(err);
    // TODO: add film producers logic

    res.status(200).send({ producer: data });
  })
}

producerController.create = async (req, res, next) => {
  let imgPaths = [];
  let fields = req.body;
  let uploads = req.files?.images
  // handle image uploads
  if (uploads !== undefined) {
    if (!Array.isArray(uploads)) {
      uploads = [uploads];
    }
    await Promise.all(uploads.map(async (img) => {
      imgPaths.push(await saveUpload(img, 'uploads/producers'));
    }));
  }
  try {
    const newProducer = await producer.create({ ...fields, images: imgPaths });
    return res.status(201).json({ producer: newProducer });
  } catch (e) { return next(e); }
}

producerController.update = async (req, res, next) => {
  let imgPaths = [];
  let fields = req.body;
  let uploads = req.files?.images;
  let { id } = req.params;
  producer.findById(id, async function (loadErr, data) {
    if (loadErr) {
      return next(loadErr);
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
    data.overwrite(fields);
    try {
      const updated = await data.save();
      return res.status(200).send({ producer: updated })
    } catch (updateError) {
      return next(updateError);
    }
  });
}


module.exports = producerController;