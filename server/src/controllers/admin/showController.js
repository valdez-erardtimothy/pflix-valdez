const show = require('../../models/show.js');

const showController = {};

showController.list=(req, res )=> { 
  res.json({});
};

showController.create = (req, res)=> {
  let {title, released, runtimeMinutes, plot, showType} = req.body;
  console.debug("body:",req.body);
  show.create({
    title: title,
    released:released,
    runtimeMinutes:runtimeMinutes,
    plot:plot,
    showType:showType
  }, function(err,data) {
    if (err) res.status(422).send({
      error:err,
      request:req.body
    });
    res.status(200).send({film: data});
  });
};

module.exports = showController;