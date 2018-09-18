const apiKey = process.env.API_KEY || "555c576824c5ed5734d13427e008d819";
var port = process.env.PORT || 80;

const express = require("express");
const request = require("request");
const app = express();
const zipcodes = require('zipcodes');
const fs = require('fs');
const mustache = require("mustache");
const predictor = require('./scripts/predictor.js');
const favicon = require("serve-favicon");
const path = require('path');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

/* serves main page */
app.get("/", function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get("/result/:postalCode/:date", function (req, res) {
    const lookup = zipcodes.lookup(req.params.postalCode.toUpperCase());
    if (!lookup) {
        console.log(`User sent invalid postal code: ${req.params.postalCode.toUpperCase()}`);
        res.sendFile(__dirname + '/result/404.html');
        return;
    }
    request(`http://api.openweathermap.org/data/2.5/forecast?lat=${lookup.latitude}&lon=${lookup.longitude}&units=metric&APPID=${apiKey}`, function (error, response, body) {
        if (error) {
            res.send(error);
            res.sendStatus(response.statusCode);
            return;
        }
        const allHoursInDay = [];
        JSON.parse(body).list.forEach(val => {
            if (val.dt_txt.includes(req.params.date)) {
                allHoursInDay.push(val);
            }
        });
        if (allHoursInDay.length > 0) {
            let minTemp = Number.MAX_SAFE_INTEGER;
            let maxTemp = -Number.MAX_SAFE_INTEGER;
            let meanTemp = 0;
            let rainFall = 0;
            let snowFall = 0;
            allHoursInDay.forEach(hour => {
                minTemp = Math.min(minTemp, hour.main.temp_min);
                maxTemp = Math.max(maxTemp, hour.main.temp_max);
                meanTemp += hour.main.temp;
                if (hour.rain) {
                    rainFall += hour.rain['3h'] || 0;
                }

                if (hour.snow) {
                    rainFall += hour.snow['3h'] || 0;
                }
            })
            if (meanTemp !== 0) {
                meanTemp /= allHoursInDay.length;
            }

            b = predictor.predict(maxTemp, meanTemp, minTemp, rainFall, snowFall)

            res.send(mustache.render(fs.readFileSync("./result/index.html").toString(), { data: Math.round(b * 10000) / 100 }));
        } else {
            res.sendStatus(404);
        }
    });
})

app.use(express.static(__dirname + '/public'));
app.listen(port, function () {
    console.log("Listening on " + port);
});