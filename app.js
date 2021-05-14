const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended:true}))

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html")
})

app.post("/",function(req,res){
    const query = req.body.cityName
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=9eb69b058dbe7841ccf4ef4b3eeaa58a&units=metric";
    https.get(url,function(response){
        console.log(response.statusCode);
        response.on("data",function(data){
            const weatherData = JSON.parse(data);
            console.log(weatherData);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageUrl = "http://openweathermap.org/img/wn/"+ icon +"@2x.png";
            res.write("<p>the weather is currently " + weatherDescription+"</p>");
            res.write("<h1>the temperature in " + query +" is "+temp+" degree celcius</h1>");
            res.write("<img src="+imageUrl+">");
            res.send()
        } )
    
    })
})


app.listen(3000,function(){
    console.log("server is set up at port 3000");
})