const express = require("express");
const router = express.Router();
const createError = require("http-errors");

router.get("/A", (req, res) => {
  Product.find()
    .then((product) => {
      res.json(product);
    })
    .catch((err) => {
      console.log(err);
      res.send(createError(err.status, err.message));
    });
});

router.get("/B", (req, res) => {
  Product.find({}, { _id: 0 })
    .then((product) => {
      res.json(product);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("somthing went wrong!");
    });
});

router.get("/C", (req, res) => {
  Product.find({ type: "Audio Album" })
    .then((product) => {
      res.json(product);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("somthing went wrong!");
    });
});

router.get("/D", (req, res) => {
  Product.find({ "pricing.retail": { $lt: 5000 } })
    .then((product) => {
      res.json(product);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("somthing went wrong!");
    });
});

router.get("/E", (req, res) => {
  Product.find({ type: { $ne: "Film" } })
    .then((product) => {
      res.json(product);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("somthing went wrong!");
    });
});

router.get("/F", (req, res) => {
  Product.find({ "shipping.weight": { $gt: 15 } })
    .then((product) => {
      res.json(product);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("somthing went wrong!");
    });
});

router.put("/G", (req, res) => {
  Product.findOneAndUpdate(
    { "details.title": "The Matrix" },
    { "pricing.list": 2500 },
    { new: true }
  )
    .then((product) => {
      res.send(true);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("somthing went wrong!");
    });
});

router.get("/H", (req, res) => {
  Product.find({ $and: [{ type: "Film" }, { "shipping.dimensions.depth": 1 }] })
    .then((product) => {
      res.json(product);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("somthing went wrong!");
    });
});

router.get("/I", (req, res) => {
  Product.countDocuments({ type: "Film" })
    .then((count) => {
      res.json(count);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("somthing went wrong!");
    });
});

router.get("/J", (req, res) => {
  Product.find({ "details.writer": /.*Jonathan Nolan.*/ })
    .then((product) => {
      res.json(product);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("somthing went wrong!");
    });
});

router.get("/K", (req, res) => {
  Product.find({}, { "pricing.savings": 1 })
    .sort({ "pricing.savings": -1 })
    .limit(1)

    .then((product) => {
      res.json(product);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("somthing went wrong!");
    });
});

router.get("/L", (req, res) => {
  Product.find({ "details.title": { $regex: ".*x.*" } })

    .then((product) => {
      res.json(product);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("somthing went wrong!");
    });
});

router.delete("/M", (req, res) => {
  Product.deleteOne({ "details.aspect_ratio": "1.66:1" })

    .then((product) => {
      res.send(true);
    })
    .catch((err) => {
      console.log(err);
      res.send(createError(err.status, err.message));
    });
});

module.exports = router;
