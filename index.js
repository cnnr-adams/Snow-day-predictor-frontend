const apiKey = process.env.API_KEY || "555c576824c5ed5734d13427e008d819";
const express = require("express");
const request = require("request");
const app = express();
const zipcodes = require('zipcodes');
const cmd = require("node-cmd");
/* serves main page */
app.get("/", function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get("/result/:postalCode/:date", function (req, res) {
    const lookup = zipcodes.lookup(req.params.postalCode.toUpperCase());
    console.log(`http://api.openweathermap.org/data/2.5/forecast?lat=${lookup.latitude}&lon=${lookup.longitude}&units=metric&APPID=${apiKey}`);
    request(`http://api.openweathermap.org/data/2.5/forecast?lat=${lookup.latitude}&lon=${lookup.longitude}&units=metric&APPID=${apiKey}`, function (error, response, body) {
        const allHoursInDay = [];
        JSON.parse(body).list.forEach(val => {
            if (val.dt_txt.includes(req.params.date)) {
                allHoursInDay.push(val);
            }
        });
        console.log(allHoursInDay[0].main);
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
                rainFall += hour.rain['3h'] || 0;
                if (hour.main.snow) {
                    rainFall += hour.snow['3h'] || 0;
                }
            })
            if (meanTemp !== 0) {
                meanTemp /= allHoursInDay.length;
            }
            cmd.get(``, function (error, data, stderr) {
                res.send({ minTemp: minTemp, maxTemp: maxTemp, meanTemp: meanTemp, rainFall: rainFall, snowFall: snowFall });
            })
        } else {
            res.sendStatus(404);
        }
    });
})

/* serves all the static files */
app.get(/^(.+)$/, function (req, res) {
    res.sendFile(__dirname + req.params[0]);
})

var port = process.env.PORT || 25565;
app.listen(port, function () {
    console.log("Listening on " + port);
});