var express = require("express");
var app = express();
app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, , authorization"
  );
  res.header("Access-Control-Allow-Methods", "GET,POST,DELETE,PUT,OPTIONS");
  next();
});

var port = process.env.PORT || 2410;
app.listen(port, () => console.log(`Node app listening on port ${port}!`));

let axios = require("axios");

app.post("/getData", function (req, res) {
  let { url = "", json = {} } = req.body;
  axios
    .get(url, { headers: json })
    .then((result) => {
      res.send(JSON.stringify(result.data));
    })
    .catch((err) => {
      if (err.response) {
        let { status, statusText } = err.response;
        res.status(status).send(statusText);
      } else res.status(404).send(err);
    });
});

app.post("/postData", function (req, res) {
  let { url = "", json = {}, data = {} } = req.body;
  axios
    .post(url, JSON.parse(data), { headers: json })
    .then((result) => {
      res.send(JSON.stringify(result.data));
    })
    .catch((err) => {
      if (err.response) {
        let { status, statusText } = err.response;
        res.status(status).send(statusText);
      } else res.status(404).send(err);
    });
});

app.post("/putData", function (req, res) {
  let { url = "", json = {}, data = {} } = req.body;
  axios
    .put(url, JSON.parse(data), { headers: json })
    .then((result) => {
      res.send(JSON.stringify(result.data));
    })
    .catch((err) => {
      if (err.response) {
        let { status, statusText } = err.response;
        res.status(status).send(statusText);
      } else res.status(404).send(err);
    });
});
app.post("/deleteData", function (req, res) {
  let { url = "", json = {} } = req.body;
  axios
    .delete(url, { headers: json })
    .then((result) => {
      res.send(JSON.stringify(result.data));
    })
    .catch((err) => {
      if (err.response) {
        let { status, statusText } = err.response;
        res.status(status).send(statusText);
      } else res.status(404).send(err);
    });
});
