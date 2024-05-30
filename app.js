// npm init -y
// npm i express
// npm i dotenv
// npm i mongoose

require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const app = express();
const port = process.env.PORT;
const connectionstring = process.env.CONNECTION_STRING;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const OfferSchema = new mongoose.Schema({
  name: String,
  title: String,
  description: String,
  author: String,
  category: String,
  tag: String,
  price: Number,
  DeliveryPrice: Number,
  CreationDate: { type: Date, default: Date.now },
});
const Offer = mongoose.model("NodeExam.Sem2Exam", OfferSchema);

async function main() {
  try {
    await mongoose.connect(connectionstring, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Not connect to MongoDB", error);
  }
}

const users = [
  { id: 1, name: "User1", password: "password1" },
  { id: 2, name: "User2", password: "password2" },
  { id: 3, name: "User3", password: "password3" },
];

function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send("No authentication!");
  }

  const [name, password] = Buffer.from(authHeader.split(" ")[1], "base64")
    .toString()
    .split(":");
  const user = users.find((u) => u.name === name && u.password === password);
  if (!user) {
    return res.status(401).send("Invalid authentication!");
  }

  req.user = user;
  next();
}
app.use((req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    console.log("Authorization Header:", authHeader);
  } else {
    console.log("No Authorization Header found");
  }
  next();
});

function logRequest(req, res, next) {
  if (process.argv.includes("debug")) {
    const log = `${new Date().toISOString()} - ${req.method} ${req.url}\n`;
    fs.appendFileSync(path.join(__dirname, "requests.log"), log);
  }
  next();
}

app.use(logRequest);

app.get("/heartbeat", (req, res) => {
  res.send(new Date().toISOString());
});

app.post("/offers", async (req, res) => {
  const ad = new Offer(req.body);
  await ad.save();
  res.status(201).send(ad);
});

app.get("/offers/id/:id", async (req, res) => {
  const ad = await Offer.findById(req.params.id);
  if (!ad) {
    return res.status(404).send("Offer not found");
  }

  res.format({
    "text/plain": function () {
      res.send(ad.toString());
    },
    "text/html": function () {
      res.send(`<h1>${ad.title}</h1><p>${ad.description}</p>`);
    },
    "application/json": function () {
      res.json(ad);
    },
    default: function () {
      res.status(406).send("Not Acceptable");
    },
  });
});

app.get("/offers/category/:category", async (req, res) => {
  try {
    const category = req.params.category;
    const ads = await Offer.find({
      category: { $regex: new RegExp(category, "i") }, // ignoruje duze male litery
    });
    res.json(ads);
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong!");
  }
});

app.get("/offers/price", async (req, res) => {
  try {
    const { minPrice, maxPrice } = req.query;
    const query = {};

    if (minPrice) {
      query.price = { $gte: Number(minPrice) };
    }
    if (maxPrice) {
      query.price = { ...query.price, $lte: Number(maxPrice) };
    }

    const ads = await Offer.find(query);
    res.json(ads);
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong!");
  }
});

app.get("/offers/date", async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const query = {};

    if (startDate) {
      query.CreationDate = { $gte: new Date(startDate) };
    }
    if (endDate) {
      query.CreationDate = { ...query.CreationDate, $lte: new Date(endDate) };
    }

    const ads = await Offer.find(query);
    res.json(ads);
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong!");
  }
});

app.get("/offers/author/:author", async (req, res) => {
  try {
    const author = req.params.author;
    const ads = await Offer.find({
      author: { $regex: new RegExp(author, "i") },
    });
    res.json(ads);
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong!");
  }
});

app.get("/offers", async (req, res) => {
  const ads = await Offer.find();
  res.json(ads);
});

app.delete("/offers/:id", authenticate, async (req, res) => {
  const ad = await Offer.findById(req.params.id);
  if (!ad) {
    return res.status(404).send("Offer not found");
  }

  if (ad.author !== req.user.name) {
    return res.status(403).send("Forbidden");
  }

  await ad.deleteOne();
  res.send("Offer deleted");
});

app.put("/offers/:id", authenticate, async (req, res) => {
  const ad = await Offer.findById(req.params.id);
  if (!ad) {
    return res.status(404).send("Offer not found");
  }

  if (ad.author !== req.user.name) {
    return res.status(403).send("Forbidden");
  }

  Object.assign(ad, req.body);
  await ad.save();
  res.send(ad);
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./404_page_cover.jpg"));
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

main();
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
