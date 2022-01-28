import express from "express";
import {
  getData,
  postData,
  deleteData,
  putData,
} from "../controller/empController.js";

import { body, validationResult } from "express-validator";
import jwt from "jsonwebtoken";

const sKey = "komal@neel@jeff@madhuri@vinayak";
const router = express.Router();

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  console.log(token);
  if (token == null) {
    res.json({ err: 1, msg: "Token not match" });
  } else {
    jwt.verify(token, sKey, (err, data) => {
      if (err) {
        res.json({ err: 1, msg: "Token incorrect" });
      } else {
        console.log("Match");
        next();
      }
    });
  }
}

router.get("/token", async (req, res) => {
  let payload = {
    uid: "komal@gmail.com",
  };
  const token = jwt.sign(payload, sKey, { expiresIn: 30000 });
  res.json(token);
});

router.get("/get", authenticateToken, async (req, res) => {
  res.send(await getData());
});

router.post(
  "/post",
  authenticateToken,
  body("email").isEmail(),
  body("name").isLength({ min: 3 }).isAlpha(),
  body("phone").isNumeric().isLength({ min: 10, max: 10 }),
  async (req, res) => {
    let field = req.body;
    let err = validationResult(req);
    console.log(err);
    if (err.isEmpty()) {
      await postData(field);
      res.send("Inserted Successfully!");
    } else {
      res.send("Validations are not applied!");
    }
  }
);

router.put(
  "/put/:email",
  authenticateToken,
  body("email").isEmail(),
  body("name").isLength({ min: 3 }).isAlpha(),
  body("phone").isNumeric().isLength({ min: 10, max: 10 }),
  async (req, res) => {
    let field = req.body;
    let em = req.params.email;
    let err = validationResult(req);
    console.log(err);
    if (err.isEmpty()) {
      await putData(em, field);
      res.send("Updated Successfully!");
    } else {
      res.send("Validations are not applied!");
    }
  }
);

router.delete("/del/:email", authenticateToken, async (req, res) => {
  let em = req.params.email;
  await deleteData(em);
  res.send("Deleted Successfully!");
});

export default router;
