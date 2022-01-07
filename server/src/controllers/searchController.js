const showModel = require('../models/show');
const actorModel = require('../models/actor')
let searchController = {};


searchController.search = async (req, res, next) => {
  try {
    // retrieve search params
    let {
      keyword,
      entity = "show",
      rating = "none",
      dateStart,
      dateEnd
    } = req.query;
    // model to query
    let entityModel;
    // query conditions setup
    let where = {};
    if (rating !== "none") {
      where.ratings = { $gte: parseInt(rating) };
    }
    keyword = new RegExp(keyword, 'i');
    // set model and respective fields for keyword condition
    if (entity == "actor") {
      entityModel = actorModel;
      where.name = keyword;

    } else if (entity == "show") {
      entityModel = showModel;
      where.title = keyword;
      if (dateStart && dateEnd) {
        where.released = { $gte: dateStart, $lte: dateEnd }
      }
    }
    // do the query 
    let data = await entityModel.find(where);


    return res.status(200).send({
      results: data,
    });
  } catch (e) {
    return next(e)
  }

}


module.exports = searchController;