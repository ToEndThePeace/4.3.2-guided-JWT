const jwt = require("jsonwebtoken");
const constants = require("../config/constants");
module.exports = (req, res, next) => {
  // add code here to verify users are logged in
  const { authorization: token } = req.headers;
  console.log(token);
  if (token) {
    jwt.verify(token, constants.jwtSecret, (err, decodedToken) => {
      if (err) {
        // This means the token is invalid
        res.status(401).json({ message: "Invalid credentials" });
      } else {
        req.decodedToken = decodedToken;
        next();
      }
    });
  } else {
    res
      .status(401)
      .json({ message: "Credentials required to access this resource" });
  }
};
