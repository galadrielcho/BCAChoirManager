var database = require('../db');
const router = require('express').Router();
var path = require('path');


module.exports = function () {
        /*  "/"
    *   GET: Returns base home page
    */   
    router.get("/", function (req, res) {
        let distDir = '/frontend/bca-choir-manager/dist/bca-choir-manager/index.html'
        res.sendFile(global.appRoot + distDir);
    });
    

    /*  "/api/status"
    *   GET: Get server status
    */
   
    router.get("/api/status", function (req, res) {
        res.status(200).json({ status: "UP" });
    });


    return router;
}
    