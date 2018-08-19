import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/", (req, res) => {
  const { email, pass } = req.body.credentials;
  const db = req.app.get("db");

  db.collection("users").findOne({ email }, (err, user) => {
    if (err) {
      res.status(500).json({ errors: { global: err } });
      return;
    }

    if (user) {
      if (bcrypt.compareSync(pass, user.pass)) {
        const token = jwt.sign(
          { user: { _id: user._id, email: user.email, role: user.role } },
          process.env.JWT_SECRET
        );
        res.json({ token });
      } else {
        res.status(401).json({ errors: { global: "Invalid credentials " } });
      }
    } else {
      res.status(401).json({ errors: { global: "Invalid credentials " } });
    }
  });
});

export default router;
