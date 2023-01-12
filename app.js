const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    }

    const jsonData = JSON.stringify(data);

    const url = "https://us21.api.mailchimp.com/3.0/lists/b14ab3538e"

    const options = {
        method: "POST",
        auth: "subuxd:1c65a5d7cc8500a7acd15b381a3f7483-us21"
    }

    const request = https.request(url, options, function(response){

        if (response.statusCode == 200){
            res.sendFile(__dirname +"/success.html");
        } else{
            res.sendFile(__dirname +"/failure.html");
            
        }

        response.on("data", function(data){
            console.log(JSON.parse(data));
        });
    });

    request.write(jsonData);
    request.end();
});


app.post("/failure", function(req, res){
    res.redirect("/")
})

app.listen(3000, function(){
    console.log("Server is running on port 3000.");
});









//API key
// 1c65a5d7cc8500a7acd15b381a3f7483-us21

//list ID
// b14ab3538e







// const mailchimp = require("@mailchimp/mailchimp_marketing");

// mailchimp.setConfig({
//   apiKey: "1c65a5d7cc8500a7acd15b381a3f7483-us21",
//   server: "us21",
// });

// async function getIformation() {
//   const response = await mailchimp.ping.get();
//   console.log(response);

//   const response = await mailchimp.lists.getAllLists();
//   console.log(response);

//   const response = await mailchimp.lists.getList("b14ab3538e");
//   console.log(response);
// }

// // getIformation();

// const addMembers = async () => {
//     const response = await mailchimp.lists.addListMember("b14ab3538e", {
//       email_address: "subusingh@gmail.com",
//       status: "subscribed",
//     });
//     console.log(response);
//   };

// // addMembers();

// app.get("/audience", async(req, res, next)=>{

//     const response = await mailchimp.lists.getList("b14ab3538e");
//   console.log(response);
//   res.status(200).json(response);
// });


// app.post("/audience", async(req, res, next)=>{
//     const {email, status} = req.body;

//     const response = await mailchimp.lists.addListMember("b14ab3538e", {
//         email_address: "email",
//         status: "status",
//       });
   
//   res.status(200).json(response);
// });


