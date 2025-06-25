const checkRole = (role) => {
  return function (req, res, next) {
    if (!req.user || req.user.role !== role) {
      return res.status(403).json({ message: "Access Denied" });
    }
    next();
  };
};

module.exports = checkRole;
