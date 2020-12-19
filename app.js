const express = require("express");
const bodyParser = require("body-parser");
var https = require("https");
const app = express();


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req,res){
   res.sendFile(__dirname + "/index.html")
})

app.post("/", function(req, res) {

  var nartist = req.body.artist;
  //console.log(nartist);
  var nsong = req.body.song;
  //console.log(nsong);

  var textboxl = req.body.lyricsong;
  console.log(req.body)

  url = "https://api.lyrics.ovh/v1/"+ nartist + "/" + nsong;
  console.log(url);

  // var traslatedata = {
  //   BODY = {
  //     "from": "en_US",
  //     "to": "es_CO"
  //     "data": "Today is a nice day"
  //     "platform": "api"
  //   },
  //   HEADERS = {
  //     Authorization: "Bearer a_ItVQVpy8n2JpN7SO382k7W0vMPV3O27WE9QQ0PXkAAAPDX9HEHRS5VJmcPuOPGzZoH2U0PglLUVbv2W0"
  //   }
  // }
  //
  //
  // var url = "https://api-b2b.backenster.com/b1/api/v3/translate"
  // https.request(url, traslatedata, function(response){
  //   console.log(response.statusCode);
  // })

  https.get(url, function(response){
     console.log(response.statusCode);

     response.on("data",function(data){
      var letters = JSON.parse(data)
      var lyricsong = letters.lyrics
      //console.log(letter);
      res.send(lyricsong)

  function wordCount( val ){
    var wom = val.match(/\S+/g);
    return {
      charactersNoSpaces : val.replace(/\s+/g, '').length,
      characters         : val.length,
      words              : wom ? wom.length : 0,
      lines              : val.split(/\r*\n/).length
    };
  }

  console.log(wordCount(lyricsong).words)
  console.log(wordCount(lyricsong).lines)



    })
  })
  console.log("Botton received");

});

app.listen(process.env.PORT || 3000, function(){
  console.log("Server started on port 3000");
});
