const showProducer = require("../../models/showProducer");
const producer = require("../../models/producer");
const { saveUpload, removeUploaded } = require("../../utils/assetHandler");
const removeDuplicate = require('../../utils/removeDuplicate');

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
  producer.findById(id, async function (err, data) {
    if (err) return next(err);
    data = data.toObject();
    data.producedShows = await showProducer.find({ producer: id }).populate('show').exec();
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
  let showProducerData = []
  if (fields['shows[]']) {
    if (!Array.isArray(fields['shows[]'])) {
      showProducerData.push({
        show: fields['shows[]'],
        producer: fields['producers[]']
      });
    } else {
      for (let i = 0; i < fields['shows[]'].length; i++) {
        showProducerData.push({
          show: fields['shows[]'][i],
          producer: fields['producers[]'][i]
        });
      }
    }
  }
  showProducerData = removeDuplicate(showProducerData, 'show');

  producer.findById(id, async function (loadErr, data) {
    if (loadErr) {
      return next(loadErr);
    }

    // handle uploads
    if (uploads !== undefined) {
      // delete existing pics
      if (data?.images?.length > 0) {
        await Promise.all(
          data.images.map(
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
      await showProducer.deleteMany({ producer: id });
      await showProducer.insertMany(showProducerData);
      return res.status(200).send({ producer: updated })
    } catch (updateError) {
      return next(updateError);
    }
  });
}


module.exports = producerController;