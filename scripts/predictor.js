tf = require('@tensorflow/tfjs');

// Load the binding
require('@tensorflow/tfjs-node');

var model;

tf.loadModel('file:///home/ryan/Snow-day-predictor-frontend/model/model.json').then(function (result) {
    console.log("Model loaded sucessfully")
    model = result;
}, function (err) {
    console.log(err);
})

module.exports = {
    predict: function (maxTemp, meanTemp, lowTemp, totalRain, totalSnow) {
        const tensor = tf.tensor2d([[maxTemp, meanTemp, lowTemp, totalRain, totalSnow]])

        var result = model.predict(tensor);

        return result.dataSync()[0];
    }
};

