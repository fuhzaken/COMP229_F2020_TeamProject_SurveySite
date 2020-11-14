let mongoose = require('mongoose');

let Survey = mongoose.Schema({
    Name : String,
    Question: String,
    Answer: String
},
{
    collection: "surveys"
  });

module.exports = mongoose.model('Survey', Survey);