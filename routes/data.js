var express = require('express');
var router = express.Router();
var fs = require('fs');
var destinationfolder ='./datastore/'; //This is a default destination folder it can be changed for the clients need
var checkfortime = (key)=>{  //This is used for checking the time of limit
  const path = destinationfolder+key+'.json'
  var data=fs.readFileSync(path, 'utf8');
  var words=JSON.parse(data);
  var d = new Date();
  var t = d.getTime();
  if(words.TimeToLive==NULL||words.TimeToLive-t>=0)
  {
    return;
  }

  fs.unlinkSync(path);
}
/* GET users listing. */
router.route('/').get( function(req, res, next) {
  try{checkfortime(req.body.key);}
  catch(err)
  {}
  try{  var name=req.body.key.concat(".json");

  try{

    var data=fs.readFileSync(destinationfolder+name, 'utf8');
    var words=JSON.parse(data);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(words);
  }
  catch(err){
    res.statusCode=500;
    res.send("there is no such file available \n "+err);

  }
}
catch(err){
  res.statusCode=500;
  res.send("there is no key information given");
}
}).post(function(req, res, next) {    //This requires client to attach body containing schema of Key and Data as a mandotary feature and time-to-live is a optional feature
  try{checkfortime(req.body.key);}
  catch(err)
  {}
  var name=req.body.key.concat(".json");
  try{
    var data=fs.readFileSync(destinationfolder+name, 'utf8');
    res.statusCode = 500;
    res.send("the key value "+name+" already present.")
  }
  catch(err)
  {

    var valu=-1;
    try
    {
      valu=1000*req.body.TimeToLive;
      var d = new Date();
      var t = d.getTime();
      valu+=t;
    }
    catch(err)
    {
      console.log("there is no time to limit");
    }
    console.log(valu);

    var result={data:req.body.data,TimeToLive:valu};
    var myJSON = JSON.stringify(result);




    fs.writeFile(destinationfolder+name,myJSON, function(err) {
      if (err) {
        console.log(err);
      }
    });
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(result);
  }
  }).delete(function(req, res, next) {   //This is used to delete the Key given by the client


    const path = destinationfolder+req.body.key+'.json'
    try
    {
      checkfortime(req.body.key);
    }
    catch(err)
    {
      console.log("time expired");
    }
    try {
      fs.unlinkSync(path);
      res.statusCode = 200;
      res.send("successfully deleted "+req.body.key);
    } catch(err) {
      res.statusCode = 500;
      res.send("the file "+req.body.key+".json is unavailable")
    }
  });
  router.route('/:key').get( (req, res, next)=>{
    var name=req.params.key.concat(".json");
    try{checkfortime(req.params.key);}
    catch(err)
    {
    }
    try{
      var data=fs.readFileSync(destinationfolder+name, 'utf8');
      var words=JSON.parse(data);

      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(words);
    }
    catch(err){
      res.statusCode=500;
      res.send("there is no such file available");
    }
  }).post( function(req, res, next) {
    try{checkfortime(req.params.key);}
    catch(err)
    {}
      var name=req.params.key.concat(".json");
    try{
      var data=fs.readFileSync(destinationfolder+name, 'utf8');
      res.statusCode = 500;
      res.send("the key value "+name+" already present.")
    }
    catch(err)
    {
    var valu=-1
    try{
      valu=1000*req.body.TimeToLive;
      var d = new Date();
      var t = d.getTime();
      valu+=t;
    }
    catch(err)
    {
      console.log("there is no time to limit");
    }


    var result={data:req.body.data,TimeToLive:valu};

    var myJSON = JSON.stringify(result);



    fs.writeFile(destinationfolder+name,myJSON, function(err) {
      if (err) {
        console.log(err);
      }
    });
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(result);
}
  }).delete( function(req, res, next) {


    const path = destinationfolder+req.params.key+'.json'

    try {checkfortime(req.params.key);
      fs.unlinkSync(path);
      res.statusCode = 200;
      res.send("successfully deleted "+req.params.key);
    } catch(err) {
      res.statusCode = 500;
      res.send("the file "+req.params.key+".json is unavailable");
    }
  });
  module.exports = router;
