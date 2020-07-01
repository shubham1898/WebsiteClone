var express = require("express");
var bodyParser = require("body-parser");
const cheerio = require("cheerio");
const axios = require("axios");
const fetch=require('node-fetch');

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set('port',(process.env.PORT || 3000));

var result={};
var siteUrl="";
// var globalresult={};

app.get("/",(req,res)=>{
    res.render("home.ejs");
});

const fetchData=async siteUrl =>{
    try{
        let response=await fetch(siteUrl);
        let json=await response.json();
       console.log(json);
       console.log(response);
       // return json;
       return response;
    }catch(error){
        console.log(error)

    }
}
const fetchDataax = async (Url) => {
            try {
                result = await axios.get(Url);
               var globalresult = result.data;
                // console.log(globalresult);               //return file as object
                // return cheerio.load(result.data);
                console.log(typeof globalresult);
                return globalresult;
            }
            catch (e) {
                console.error(e); // log internal error
                return next(new Error('Internal Server Error')); // return public error to client
            }
        }

app.post("/clone",async(req,res)=>{
    try{
      siteUrl=req.body.name;
     var data= await fetchDataax(siteUrl);
    //  var data=JSON.stringify(data2)
      res.render('clonesites.ejs',{data:data,url:siteUrl});
    }catch(error){
        console.log(error);
    }
});

app.get("/:id1/:id2/:id3/:id4/:id5/:id6",async(req,res)=>{
    try{
   var linkpart1= req.params.id1;
   var linkpart2= req.params.id2;
   var linkpart3= req.params.id3;
   var linkpart4= req.params.id4;
   var linkpart5= req.params.id5;
   var linkpart6= req.params.id6;
   var link=siteUrl+"/"+linkpart1+"/"+linkpart2+"/"+linkpart3+"/"+linkpart4+"/"+linkpart5+"/"+linkpart6;
   var data=await fetchDataax(link);
   res.render("clonesites.ejs",{data:data})
    }catch(err){
        console.log(err);
    }
});
app.get("/:id1/:id2/:id3/:id4/:id5",async(req,res)=>{
    try{
   var linkpart1= req.params.id1;
   var linkpart2= req.params.id2;
   var linkpart3= req.params.id3;
   var linkpart4= req.params.id4;
   var linkpart5= req.params.id5;
   var link=siteUrl+"/"+linkpart1+"/"+linkpart2+"/"+linkpart3+"/"+linkpart4+"/"+linkpart5;
   var data=await fetchDataax(link);
   res.render("clonesites.ejs",{data:data})
    }catch(err){
        console.log(err);
    }
});
app.get("/:id1/:id2/:id3/:id4",async(req,res)=>{
    try{
   var linkpart1= req.params.id1;
   var linkpart2= req.params.id2;
   var linkpart3= req.params.id3;
   var linkpart4= req.params.id4;
   var link=siteUrl+"/"+linkpart1+"/"+linkpart2+"/"+linkpart3+"/"+linkpart4;
   var data=await fetchDataax(link);
   res.render("clonesites.ejs",{data:data})
    }catch(err){
        console.log(err);
    }
});
app.get("/:id1/:id2/:id3",async(req,res)=>{
    try{
   var linkpart1= req.params.id1;
   var linkpart2= req.params.id2;
   var linkpart3= req.params.id3;
   var link=siteUrl+"/"+linkpart1+"/"+linkpart2+"/"+linkpart3;
   var data=await fetchDataax(link);
   res.render("clonesites.ejs",{data:data})
    }catch(err){
        console.log(err);
    }
});
app.get("/:id1/:id2",async(req,res)=>{
    try{
   var linkpart1= req.params.id1;
   var linkpart2= req.params.id2;
   var link=siteUrl+"/"+linkpart1+"/"+linkpart2;
   var data=await fetchDataax(link);
   res.render("clonesites.ejs",{data:data})
    }catch(err){
        console.log(err);
    }
});
app.get("/:id1",async(req,res)=>{
    try{
   var linkpart1= req.params.id1;
   var link=siteUrl+"/"+linkpart1;
   var data=await fetchDataax(link);
   res.render("clonesites.ejs",{data:data})
    }catch(err){
        console.log(err);
    }
});


app.listen(app.get('port'),()=>{
    console.log("Server Started website live!!!!")
});
