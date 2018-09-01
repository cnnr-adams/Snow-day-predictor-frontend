const express = require("express");
const app = express();

/* serves main page */
app.get("/", function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get("/result/:postalCode/:date", function (req, res) {
    console.log(req.params);
    res.sendFile(__dirname + '/result/index.html');
})

/* serves all the static files */
app.get(/^(.+)$/, function (req, res) {
    res.sendFile(__dirname + req.params[0]);
})

var port = process.env.PORT || 25565;
app.listen(port, function () {
    console.log("Listening on " + port);
});