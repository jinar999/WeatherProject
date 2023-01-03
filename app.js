const { response } = require("express");
const express = require("express");

const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/result", function (req, res) {
  // console.log("post request is working");
  // console.log(req.body.CityName);
  const query = req.body.CityName;

  // const cityName = "Delhi";
  const apiKey = "915d962d47bcc34bf48f31fa4295df5b";
  const unit = "metric";
  const weatherUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&units=" + 
    unit +
    "&lang=en&appid=" +
    apiKey;

  https.get(weatherUrl, function (response) {
    console.log(response.statusCode);
    response.on("data", function (data) {
      // console.log(data);
      const weatherData = JSON.parse(data);
      // console.log(weatherData);
      // const cityName = weatherData.name;
      const description = weatherData.weather[0].description;
      const cityTemp = weatherData.main.temp;
      const weatherImg = weatherData.weather[0].icon;
      const weatherImgUrl =
        "http://openweathermap.org/img/wn/" + weatherImg + "@2x.png";
      console.log("temprature in " + query + " is  " + cityTemp);
      console.log("Weather description:  " + description);
      res.write("<p> Weather description:  " + description + "</p>");
      res.write(
        "<h1> Temprature in " +
          query +
          " is " +
          cityTemp +
          " degree celcias </h1> "
      );

      res.write("<img src= " + weatherImgUrl + ">");
      res.send();
    });
  });
});
app.listen(3000, function (req, res) {
  console.log("app is running at 3000 by Jinar ");
});
