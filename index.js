
var express = require('express')
var app = express()

app.get('/health', function (req, res) {
  res.json({
      status: 'Working',
      responseCode: '200'
  });
})

let port = process.env.PORT || 3000;
app.listen(port, function () {
  return console.log("Started file upload server on port " + port);
});

