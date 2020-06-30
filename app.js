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
const fetchDataax = async (siteUrl) => {
            try {
                result = await axios.get(siteUrl);
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
      var siteUrl=req.body.name;
    //   var siteUrl='https://www.instagram.com/shubhamshrivastav1898/?__a=1'
    //   var siteUrl='http://dummy.restapiexample.com/api/v1/employees'
    //   var siteUrl='https://www.geeksforgeeks.org/java'
    // var siteUrl="http://www.coomeet.com"
    // var siteUrl="http://www.instagram.com"
    // var siteUrl="https://stackoverflow.com/questions/16098397/pass-variables-to-javascript-in-expressjs"
    // var siteUrl="https://www.india.gov.in"
     var data= await fetchDataax(siteUrl);
    //  var data=JSON.stringify(data2)
      res.render('clonesites.ejs',{data:data,url:siteUrl});
    }catch(error){
        console.log(error);
    }
})
// app.post("/result",async(req,res)=>{
//     var name=req.body.name;
//     var siteUrl='https://www.instagram.com/' + name + '/?__a=1'
//    
//      await fetchData();
//     var profilepicurl = globalresult.graphql.user.profile_pic_url;
//       var  full_name = globalresult.graphql.user.full_name;
//       var  bio = globalresult.graphql.user.biography;
//       var  postcount = globalresult.graphql.user.edge_owner_to_timeline_media.count;
//     res.render("result.ejs",{name:name,pic:profilepicurl,fullname:full_name,post:postcount,bio:bio});
// });


app.listen(app.get('port'),()=>{
    console.log("Server Started website live!!!!")
});
