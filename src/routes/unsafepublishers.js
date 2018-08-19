import express from "express";
import mongodb from "mongodb";

const router = express.Router();

const validate = data => {
  const errors = {};

  if (!data.name) errors.name = "This field can't be blank";
  if (!data.website) errors.website = "This field can't be blank";

  return errors;
};

//@route - GET '/'
//@description - Retrieve the list of all the unsafe publishers

router.get("/", (req, res) => {
  const db = req.app.get("db");
  db.collection("publishers")
    .find({})
    .toArray((err, publishers) => {
      if (err) {
        res.status(500).json({ errors: { global: err } });
        return;
      }

      res.json({ publishers });
    });
});

//@route - GET '/:id'
//@description - Retrieve a specific publisher by its id

router.get("/:id", (req, res) => {
  const db = req.app.get("db");
  db.collection("publishers").findOne(
    { _id: new mongodb.ObjectId(req.params.id) },
    (err, publisher) => {
      if (err) {
        res.status(500).json({ errors: { global: err } });
        return;
      }

      res.json({ publisher });
    }
  );
});

//@route - POST '/'
//@description - Create a publisher

router.post("/", (req, res) => {
  const db = req.app.get("db");
  const errors = validate(req.body.publisher);

  if (Object.keys(errors).length === 0) {
    db.collection("publishers").insertOne(req.body.publisher, (err, r) => {
      if (err) {
        res.status(500).json({ errors: { global: err } });
        return;
      }

      res.json({ publisher: r.ops[0] });
    });
  } else {
    res.status(400).json({ errors });
  }
});

//@route - PUT '/:id'
//@description - Update a specific publisher by its id

router.put("/:id", (req, res) => {
  const db = req.app.get("db");
  const { _id, ...publisherData } = req.body.publisher;
  const errors = validate(publisherData);

  if (Object.keys(errors).length === 0) {
    db.collection("publishers").findOneAndUpdate(
      { _id: new mongodb.ObjectId(req.params.id) },
      { $set: publisherData },
      { returnOriginal: false },
      (err, r) => {
        if (err) {
          res.status(500).json({ errors: { global: err } });
          return;
        }

        res.json({ publisher: r.value });
      }
    );
  } else {
    res.status(400).json({ errors });
  }
});

//@route - DELETE '/:id'
//@description - Delete a specific publisher by its id

router.delete("/:id", (req, res) => {
  const db = req.app.get("db");

  db.collection("publishers").deleteOne(
    { _id: new mongodb.ObjectId(req.params.id) },
    err => {
      if (err) {
        res.status(500).json({ errors: { global: err } });
        return;
      }

      res.json({});
    }
  );
});

export default router;
