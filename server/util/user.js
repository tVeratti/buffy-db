const jwt = require('jsonwebtoken');

module.exports = {
  getUser: cookies => {
    let user;
    try {
      user = jwt.verify(cookies.user, process.env.JWT_SECRET).id;
    } catch (err) {}

    return user;
  }
};
