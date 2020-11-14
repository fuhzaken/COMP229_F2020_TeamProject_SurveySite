//COMP229_Midterm IksangYoo 300893315
// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the survey model
let survey = require('../models/surveys');

/* GET surveys List page. READ */
router.get('/', (req, res, next) => {
  // find all surveys in the surveys collection
  survey.find( (err, surveys) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('surveys/index', {
        title: 'surveys',
        surveys: surveys
      });
    }
  });
});

//  GET the survey Details page in order to add a new surveys
router.get('/add', (req, res, next) => {

  res.render('surveys/add', 
  {title: 'Add Survey',surveys:''
})

});

// POST process the survey Details page and create a new survey - CREATE
router.post('/add', (req, res, next) => {

  let newSurvey = survey({
    "Name": req.body.name,
    "Question": req.body.question,
    "Answer": req.body.answer
});

survey.create(newSurvey, (err, Survey) =>{
    if(err)
    {
        console.log(err);
        res.end(err);
    }
    else
    {
        // refresh the survey list
        res.redirect('/surveys');
    }
});

});
// Survey
router.get('/survey/:id', (req, res, next) => {
  let id = req.params.id

  survey.findById(id, (err, survey) => {
    if(err)
    {
        console.log(err);
        res.end(err);
    }
    else
    {
        //show the edit view
        res.render('surveys/survey', 
        {title: 'Survey', 
        surveys: survey})
    }
});
});

// GET the survey Details page in order to edit an existing survey
router.get('/edit/:id', (req, res, next) => {
  let id = req.params.id

  survey.findById(id, (err, surveyToEdit) => {
    if(err)
    {
        console.log(err);
        res.end(err);
    }
    else
    {
        //show the edit view
        res.render('surveys/edit', 
        {title: 'Edit Survey', 
        surveys: surveyToEdit})
    }
});
});

// POST - process the information passed from the details form and update the document
router.post('/edit/:id', (req, res, next) => {
  let id = req.params.id

  let updatedSurvey = survey({
    "_id": id,
    "Name": req.body.name,
    "Question": req.body.question,
    "Answer": req.body.answer
});

survey.updateOne({_id: id}, updatedSurvey, (err) => {
    if(err)
    {
        console.log(err);
        res.end(err);
    }
    else
    {
        // refresh the survey list
        res.redirect('/surveys');
    }
});

});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {
  let id = req.params.id

  survey.remove({_id: id}, (err) => {
    if(err)
    {
        console.log(err);
        res.end(err);
    }
    else
    {
         // refresh the survey list
         res.redirect('/surveys');
    }
});
});


module.exports = router;