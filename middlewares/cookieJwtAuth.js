const jwt = require('jsonwebtoken');

module.exports.cookieJwtAuth = (req, res, next) => {
    const token = req.cookies.token;
    try {
        const user = jwt.verify(token, process.env.JWT);
        req.user = user;
        next()
    } catch (error) {
        res.clearCookie("token");
        return res.redirect("/")
    }
};