const express = require("express");
const https = require("https");
const bodyparser = require("body-parser");

const app = express();
app.use(express.static("public"));
app.use(bodyparser.urlencoded({ extended: true }));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {
    //console.log(req.body.firstname);
    //console.log(req.body.lastname);
    //console.log(req.body.email);

    const data = {
        members: [{
            email_address: req.body.email,
            status: "subscribed",
            merge_fields: {
                FNAME: req.body.firstname,
                LNAME: req.body.lastname
            }
        }]
    };
    var jsondata = JSON.stringify(data);
    const url = "https://us7.api.mailchimp.com/3.0/lists/a7a6bc9ea8";
    const options = {
        method: "POST",
        auth: "abhishek:809719fa1412baab476bcf36a7c838b3-us7"
    }

    const request = https.request(url, options, function(response) {
        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html");
        } else {
            res.sendFile(__dirname + "/failure.html");
        }
        response.on("data", function(data) {
            console.log(JSON.parse(data));
        })
    })
    request.write(jsondata);
    request.end();
});

app.post("/failure", function(req, res) {
    res.redirect("/")
});

app.listen(process.env.PORT || 3000, function() {
    console.log("signup page server has been started");
})

//api key
//809719fa1412baab476bcf36a7c838b3-us7

//audience or list ID
//a7a6bc9ea8