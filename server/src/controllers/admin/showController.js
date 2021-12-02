const show = require('../../models/show.js');

const showController = {};

showController.list = async(req, res )=> { 
  let shows = await show.find().sort({released:-1 });
  res.status(200).json({shows:shows});
};

showController.read = async(req,res)=> {
  let {id} = req.body;
  show.findOne({_id:id});
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

showController.destroy = async (req,res) => {
  let {id} = req.params;
  console.debug('show destroy route');
  show.deleteOne({_id:id}, function(err,data) {
    if(err) {
      res.status(400).send("error in deleting show!", err);
    }
    res.status(200).send(data);
  });
};

module.exports = showController;