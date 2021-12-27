const showModel = require('../models/show');
const actorModel = require('../models/actor')
let searchController = {};


searchController.search = async (req, res, next) => {
  // retrieve search params
  let {
    keyword,
    entity = "show"
  } = req.query;
  // model to query
  let entityModel;
  // query conditions setup
  let where = {};
  keyword = new RegExp(keyword, 'i');
  // set model and respective fields for keyword condition
  if (entity == "actor") {
    entityModel = actorModel;
    where.name = keyword;

  } else if (entity == "show") {
    entityModel = showModel;
    where.title = keyword;
  }
  // do the query 
  console.debug('entityModel =', entityModel)
  let data = await entityModel.find(where);

  res.status(200).send({ results: data });
}


module.exports = searchController;