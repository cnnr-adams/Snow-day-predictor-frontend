# Snow-day-predictor
This is the frontend GitHub page for our snow day predictor project, found at http://www.calculatesnowdays.com. 

The project is written in NodeJS, Python, and frontend languages(HTML, CSS, JS). It is fully dockerized and running in an Amazon Lightsail virtual machine. To predict the chance of a snow day, a tensorflow model was trained and saved locally, and a Python service was written to receive GET requests with snow data and return the model's prediction.

## Other github pages
- [Python neural network service](https://github.com/cnnr-adams/Snow-day-predictor-neural-network)
- [Twitter Scraper and Weather compiler for snow day data](https://github.com/cnnr-adams/Snow-day-predictor)
