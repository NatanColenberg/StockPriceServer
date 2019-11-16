var express = require("express");
var request = require("request");

var app = express();
const port = 3001;

// Get Web Application from root path or 'Home'
app.get("/", (req, res) => {
  res.statusCode = 200;
  res.send("Hello From Stock Price Server!");
});

// Handle Stock Price requests
app.get("/StockPrice", (req, res) => {
  // Get the Stock Price from Yahoo Finance
  request(`https://finance.yahoo.com/quote/${req.query.symbol}/`, function(
    err,
    htmlRes,
    body
  ) {
    if (err) {
      console.error(err);
      return;
    }

    // If we could not find the symbol in Yahoo Stock Price service
    // we shall return the 400 status code - Bad Request.
    if (body.includes("currentPrice") == false) {
      console.error(`Could not resolve Stock Symbol = '${req.query.symbol}'`);
      res.sendStatus(400);
      res.header("Access-Control-Allow-Origin", "*");
      return;
    }

    // Parse body and return the stock price
    var price = parseFloat(
      body
        .split("currentPrice")[1]
        .split('fmt":"')[1]
        .split('"')[0]
    );
    res.statusCode = 200;
    res.send({ price: price });
  });
});

// Start Listening on the selected port
app.listen(port, function() {
  console.log(`Example app listening on port ${port}!`);
});
