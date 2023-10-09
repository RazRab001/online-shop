const jwt = require('jsonwebtoken'); // Import the 'jsonwebtoken' library

module.exports = function (req, res, next) {
    if (req.method === "OPTIONS") {
        next();
    } else {
        try {
            const token = req.headers.authorization.split(' ')[1]; // Correct the header property name

            if (!token) {
                return res.status(401).json({ message: "No authorization token provided" });
            }

            // Verify the token using your SECRET_KEY
            const decoded = jwt.verify(token, process.env.SECRET_KEY);

            // Attach the decoded user information to the request object
            req.user = decoded;

            next();
        } catch (e) {
            if (e instanceof jwt.TokenExpiredError) {
                return res.status(401).json({ message: "Token has expired" });
            } else {
                return res.status(401).json({ message: "Invalid token" });
            }
        }
    }
};
