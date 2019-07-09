var express = require('express');
var yahooStockPrices = require('yahoo-stock-prices');
var app = express();
const port = 3001

app.get('/', (req, res) => {
    console.log(req.query);

    yahooStockPrices.getCurrentPrice(req.query.symbol, function(err, price){

    if(err)
    {
        console.error(err);
        return;
    }

    console.log(price);
    res.statusCode = 200;
    res.send({'price': price});
    });
});

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});