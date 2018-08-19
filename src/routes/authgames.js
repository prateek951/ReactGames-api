import express from 'express';
import mongodb from 'mongodb';
import authenticate from '../middlewares/authenticate';
import adminOnly from '../middlewares/adminOnly';

const router = express.Router();

const validate = data => {
  const errors = {};

  const { name, players, publisher, thumbnail, price, duration } = data;

  if (!name) errors.name = "This field can't be blank";
  if (!players) errors.players = "This field can't be blank";
  if (!publisher) errors.publisher = 'You must choose publisher';
  if (!thumbnail) errors.thumbnail = "This field can't be blank";
  if (price <= 0) errors.price = "Too cheap, don't you think?";
  if (duration <= 0) errors.duration = "Too short, isn't it?";

  return errors;
};

// @route GET '/'
//@description - Retrieving the list of all the games 

router.get('/', (req, res) => {
  const db = req.app.get('db');
  db.collection('games').find({}).toArray((err, games) => {
    if (err) {
      res.status(500).json({ errors: { global: err } });
      return;
    }

    res.json({ games });
  });
});

// @route - GET '/:_id'
// @description - Retrieving a specific game by its id


router.get('/:_id', (req, res) => {
  const db = req.app.get('db');
  db.collection('games').findOne({ _id: new mongodb.ObjectId(req.params._id) }, (err, game) => {
    if (err) {
      res.status(500).json({ errors: { global: err } });
      return;
    }

    res.json({ game });
  });
});

router.post('/', authenticate, adminOnly, (req, res) => {
  const db = req.app.get('db');
  const errors = validate(req.body.game);
  
  if (Object.keys(errors).length === 0) {
    db.collection('games').insertOne(req.body.game, (err, r) => {
      if (err) {
        res.status(500).json({ errors: { global: err } });
        return;
      }

      res.json({ game: r.ops[0] });
    });
  } else {
    res.status(400).json({ errors });
  }
});

router.put('/:_id', authenticate, adminOnly, (req, res) => {
  const db = req.app.get('db');
  const { _id, ...gameData } = req.body.game;
  const errors = validate(gameData);

  if (Object.keys(errors).length === 0) {
    db
      .collection('games')
      .findOneAndUpdate(
        { _id: new mongodb.ObjectId(req.params._id) },
        { $set: gameData },
        { returnOriginal: false },
        (err, r) => {
          if (err) {
            res.status(500).json({ errors: { global: err } });
            return;
          }

          res.json({ game: r.value });
        }
      );
  } else {
    res.status(400).json({ errors });
  }
});

router.delete('/:_id', authenticate, adminOnly, (req, res) => {
  const db = req.app.get('db');

  db.collection('games').deleteOne({ _id: new mongodb.ObjectId(req.params._id) }, err => {
    if (err) {
      res.status(500).json({ errors: { global: err } });
      return;
    }

    res.json({});
  });
});

export default router;
