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


module.exports = producerController;