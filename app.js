

const express=require('express');
const https=require("https");
const bodyParser=require('body-parser');
const app=express();

app.use(bodyParser.urlencoded({extended:true}));



app.get("/",function(req,res)
{
  res.sendFile(__dirname+"/index.html");
})


app.post("/",function(req,res)
{
    const query=req.body.city;
    const appid="c5e71a951940340e4e94bd941715e678";
    // https://api.openweathermap.org/data/2.5/weather?q=london&appid=c5e71a951940340e4e94bd941715e678 
    const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+appid;
    console.log(url);
    
    https.get(url,function(response)
    {
      console.log(response.statusCode);
      response.on('data',function(data)
      {
        const weatherData=JSON.parse(data);
        console.log(weatherData);
        const temp=weatherData.main.temp;
        const description=weatherData.weather[0].description;

        res.write("<p>The Weather of "+query+" is "+description+"</p>");
        res.write("<p>The Temp at "+query+" is "+temp+"</p>")
        res.send();
      });
    });

})



app.listen(3000,function()
{
  console.log("Server is running on port 3000");
})

