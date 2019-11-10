const db = require("../models")


module.exports = {
    findbyId: function(req,res){
        db.Bar
        .findById(req.params.id)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    }
}