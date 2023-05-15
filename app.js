const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public")); //to use local images and css file

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", (req, res) => {
  var Fname = req.body.Fname;
  var Lname = req.body.Lname;
  var Ename = req.body.Ename;
  console.log(Fname, Lname, Ename);

  const myData = {
    members: [
      {
        email_address: Ename,
        status: "subscribed",
        merge_fields: {
          FNAME: Fname,
          LNAME: Lname,
        },
      },
    ],
  };
  const jsonData = JSON.stringify(myData);

  const url = "https://us21.api.mailchimp.com/3.0/lists/b8af2c5463";

  const options = {
    method: "POST",
    auth: "karan1:b9102da99f1eb0f8e4b6f6c3b2764d46-us21",
  };


  const request = https.request(url, options, function (response) {
    if(response.statusCode==200){
      res.sendFile(__dirname +"/success.html");
    }
    else{
      res.sendFile(__dirname +"/failure.html");
    }

    response.on("data", function (data) {
      console.log(JSON.parse(data));
    });
  });

  request.write(jsonData);
  request.end();
});

app.post("/failure" , function(req,res){
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, function (req, res) {
  console.log("App is running on port 3000!");
});


// audience id
// b8af2c5463

// API key
// b9102da99f1eb0f8e4b6f6c3b2764d46-us21
