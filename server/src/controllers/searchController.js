const showModel = require('../models/show');

let searchController = {};


searchController.search = async (req, res, next) => {
  let {
    keyword,
    entity = "Movie"
  } = req.query;
  let where = {
    showType: entity,
    title: { $regex: new RegExp(keyword, "i") }
  };
  let data = await showModel.find(where);

  res.status(200).send({ results: data });
}


module.exports = searchController;