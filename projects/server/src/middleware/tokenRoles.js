const jwt = require('jsonwebtoken');

const verifyToken = (req,  res, next) => {
    let token = req.headers.authorization;
    const verifier = process.env.JWT_KEY_VERIFY
    if (!token) {
        return res.status(401).send('no token')
    };

    try{
        token = token.split(' ')[1];

        if (token === 'null' || !token) {
            return res.status(401).send('denied')
        };

        let verifiedUser = jwt.verify(token, verifier );
        if (!verifiedUser) {
            return res.status(401).send('illegal unverified')
        }
        req.user = verifiedUser;
        next();
    }
    catch(err){
        return res.status(400).send('invalid token')
    };
};

function roleCheck(allowedRoles) {
    return function(req, res, next) {
      const userRole = req.user.role; // Assuming the role is stored in the req.user object.
  
      if (!allowedRoles.includes(userRole)) {
        return res.status(403).json({ error: "You don't have permission to access this resource." });
      }
  
      // If the user has the required role, proceed to the next middleware or route handler.
      next();
    };
  }

module.exports = {verifyToken, roleCheck};