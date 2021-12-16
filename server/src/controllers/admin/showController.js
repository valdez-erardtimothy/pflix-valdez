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
      res.send({ show: data });
    }
  });
};

showController.titles = async (req, res, next) => {
  let query = show.find({}).select('_id title');
  query.exec(function (err, shows) {
    if (err) return next(err);
    res.status(200).json({ shows });
  });
}

showController.create = async (req, res) => {
  let { title, released, runtimeMinutes, plot, showType } = req.body;
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
  show.findOneAndDelete({ _id: id }, function (err, data) {
    if (err) {
      res.status(400).send("error in deleting show!", err);
    }
    res.status(200).send({ show: data });
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
    formData = { ...formData, images }

  }

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