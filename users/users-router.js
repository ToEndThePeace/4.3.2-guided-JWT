const router = require("express").Router();

const Users = require("./users-model.js");
const restricted = require("../auth/restricted-middleware.js");

router.get("/", restricted, checkRole("admin"), (req, res) => {
  Users.find()
    .then((users) => {
      res.status(200).json({ users, decodedToken: req.decodedToken });
    })
    .catch((err) => res.send(err));
});

router.get("/:id", (req, res, next) => {
  const { id } = req.params;
  Users.findById(id)
    .then((user) => {
      if (!user) res.status(404).json({ message: "User not found" });
      else res.status(200).json(user);
    })
    .catch((err) => {
      res.status(404).json({ message: "User not found" });
    });
});

function checkRole(role) {
  return (req, res, next) => {
    if (req.decodedToken.role === role) next();
    else
      res
        .status(403)
        .json({ message: "You do not have permission to access this" });
  };
}

module.exports = router;
