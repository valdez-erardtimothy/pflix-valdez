const filmography = require('../../models/filmography.js');
const show = require('../../models/show.js');
const showProducer = require('../../models/showProducer.js');
const { saveUpload } = require('../../utils/assetHandler');
const showController = {};

showController.list = async (req, res, next) => {
  try {
    let shows = await show.find().sort({ released: -1 });
    res.status(200).json({ shows: shows });

  } catch (e) { return next(e) }
};

showController.read = async (req, res, next) => {
  try {
    let { id } = req.params;
    show.findById(id, async function (err, data) {
      if (err) {
        // return res.status(500).send(err);
        return next(err);
      }
      data = data.toObject();
      data.cast = await filmography.find({ show: data._id })
        .populate('actor')
        .exec();
      data.producers = await showProducer.find({ show: data._id })
        .populate('producer')
        .exec();
      return res.status(200).send({ show: data });
    });
  } catch (e) { return next(e) }

};

showController.titles = async (req, res, next) => {
  let query = show.find({}).select('_id title');
  query.exec(function (err, shows) {
    if (err) return next(err);
    res.status(200).json({ shows });
  });
}

showController.create = async (req, res, next) => {
  try {
    let { title, genre, grossIncome, released, runtimeMinutes, plot, showType } = req.body;
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
      genre: genre,
      released: released,
      runtimeMinutes: runtimeMinutes,
      grossIncome: grossIncome,
      plot: plot,
      showType: showType,
      images: imgPaths
    }, function (err, data) {
      if (err) return res.status(422).send({
        error: err,
        request: req.body
      });
      return res.status(200).send({ show: data });
    });
  } catch (e) { return next(e) }


};

showController.destroy = async (req, res) => {
  try {
    let { id } = req.params;
    show.findOneAndDelete({ _id: id }, async function (err, data) {
      if (err) {
        return res.status(400).send("error in deleting show!", err);
      }
      await filmography.deleteMany({ show: id });
      res.status(200).send({ show: data });
    });
  } catch (e) { return next(e) }
};

showController.update = async (req, res) => {
  try {
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
        return res.status(422).send(err);
      } else {
        return res.status(200).send(
          {
            message: "Successfully updated show!",
            show: show
          }
        )
      }
    });
  } catch (e) { return next(e) }

}

module.exports = showController;