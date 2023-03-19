var database = require('../db');
const router = require('express').Router();

module.exports = function () {

    /*  "/api/status"
    *   GET: Get server status
    */
   
    router.get("/api/status", function (req, res) {
        res.status(200).json({ status: "UP" });
    });


    return router;
}
    