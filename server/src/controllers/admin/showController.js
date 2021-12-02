const show = require('../../models/show.js');
const { saveUpload } = require('../../utils/assetHandler');
const showController = {};

showController.list = async (req, res) => {
  let shows = await show.find().sort({ released: -1 });
  res.status(200).json({ shows: shows });
};

showController.read = async (req, res) => {
  let { id } = req.params;
  show.findById(id, function (err, data) {
    if (err) {
      res.send(err);
    } else {
      console.debug(data);
      res.send({ show: data });
    }
  });
};

showController.create = async (req, res) => {
  let { title, released, runtimeMinutes, plot, showType } = req.body;
  console.debug("body:", req.body);
  let uploads = req.files?.images;
  let imgPaths = [];
  if (uploads !== undefined) {
    if (!Array.isArray(uploads)) {
      uploads = [uploads]
    }

    await Promise.all(uploads.map(async (img) => {
      imgPaths.push(await saveUpload(img, 'uploads/shows'));
    }))

  }

  show.create({
    title: title,
    released: released,
    runtimeMinutes: runtimeMinutes,
    plot: plot,
    showType: showType,
    images: imgPaths
  }, function (err, data) {
    if (err) res.status(422).send({
      error: err,
      request: req.body
    });
    res.status(200).send({ show: data });
  });
};

showController.destroy = async (req, res) => {
  let { id } = req.params;
  console.debug('show destroy route');
  show.deleteOne({ _id: id }, function (err, data) {
    if (err) {
      res.status(400).send("error in deleting show!", err);
    }
    res.status(200).send(data);
  });
};

showController.update = async (req, res) => {
  let { id } = req.params;
  let formData = req.body;
  let showData = show.findById(id);
  let images = showData.images || [];
  let uploads = req.files?.images;
  if (uploads !== undefined) {
    if (!Array.isArray(uploads)) {
      uploads = [uploads]
    }

    await Promise.all(uploads.map(async (img) => {
      images.push(await saveUpload(img, 'uploads/shows'));
    }))
    console.debug("image data:", images)
    formData = { ...formData, images }
    console.debug("form data:", formData)

  }

  console.debug("request images:", req.files);
  show.findByIdAndUpdate(id, formData, function (err, show) {
    if (err) {
      res.status(422).send(err);
    } else {
      res.status(200).send(
        {
          message: "Successfully updated show!",
          show: show
        }
      )
    }
  });
}

module.exports = showController;