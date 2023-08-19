const express = require("express");

const app = express();
app.use(express.json()); // To parse the body of the request in json

const PORT = process.env.PORT || 5000;

const existingApi = async (req, res, next) => {
  const URL = "https://app.ylytic.com/ylytic/test";
  const response = await fetch(URL);
  const body = await response.json();
  req.content = body;
  // console.log(body);
  // res.send(body);
  next();
};

const searchApi = async (req, res) => {
  let content = req.content.comments;
  const query = req.query;

  // checking for search_author
  let result = content.filter((item) => {
    if (query.search_author) {
      return item.author
        .toLowerCase()
        .includes(query.search_author.toLowerCase());
    }
    return true;
  });

  // checking for search_text
  result = result.filter((item) => {
    if (query.seach_text) {
      return item.text.toLowerCase().includes(query.seach_text.toLowerCase());
    }
    return true;
  });

  // checking for search_date from
  result = result.filter((item) => {
    if (query.at_from) {
      let d = query.at_from.split("-");
      let dat = new Date(d[1] + "-" + d[0] + "-" + d[2]);
      let d1 = new Date(item.at);
      dat.setHours(datw.getHours() + 5);
      dat.setMinutes(datw.getMinutes() + 30);
      return dat.getTime() <= d1.getTime();
    }
    return true;
  });

  // checking for search_date to
  result = result.filter((item) => {
    if (query.at_to) {
      let d = query.at_to.split("-");
      let dat = new Date(d[1] + "-" + d[0] + "-" + d[2]);
      let d1 = new Date(item.at);
      dat.setHours(datw.getHours() + 5);
      dat.setMinutes(datw.getMinutes() + 30);
      return dat.getTime() >= d1.getTime();
    }
    return true;
  });

  // checking for like_from
  result = result.filter((item) => {
    if (query.like_from) {
      return item.like >= query.like_from;
    }
    return true;
  });

  // checking for like_to
  result = result.filter((item) => {
    if (query.like_to) {
      return item.like <= query.like_to;
    }
    return true;
  });

  // checking for reply from
  result = result.filter((item) => {
    if (query.reply_from) {
      return item.reply >= query.reply_from;
    }
    return true;
  });

  // checking for reply to
  result = result.filter((item) => {
    if (query.reply_to) {
      return item.reply <= query.reply_to;
    }
    return true;
  });

  res.send({ comments: result });
};

app.use("/search", existingApi, searchApi);

app.listen(PORT, console.log(`Server started at ${PORT}`));
