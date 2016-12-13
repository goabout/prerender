
// Make sure you send `Bearer 123abc` token in your request
module.exports = {
    beforePhantomRequest: function(req, res, next) {

        var auth = req.headers.authorization;
        if (!auth && process.env.TOKEN) return this.fail(req, res, next);
        if (process.env.TOKEN && !this.isAuthorized(auth)) return this.fail(req, res, next);
        req.prerender.authentication = auth;

        return next();
    },

    fail: function(req, res, next) {
        res.send(401);
    },

    isAuthorized: function(token) {
        if (("Bearer " + process.env.TOKEN) === token) return true;
    }
}
