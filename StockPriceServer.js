var express = require('express');
var request = require('request');
var app = express();
const port = 3001

app.get('/', (req, res) => {

    request(`https://finance.yahoo.com/quote/${req.query.symbol}/`, function(err, htmlRes, body){

        if (err) {
            console.error(err);
            return;
        }

        // If we could not find the symbol in Yahoo Stock Price service 
        // we shall return the 400 status code - Bad Request.
        if(body.includes("currentPrice") == false){
            console.error(`Could not resolve Stock Symbol = '${req.query.symbol}'`);
            res.sendStatus(400);
            return;
        }
        
        // Parse body and return the stock price
        var price = parseFloat(body.split("currentPrice")[1].split("fmt\":\"")[1].split("\"")[0]);
        res.statusCode = 200;
        res.send({'price': price});
    });
});

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});