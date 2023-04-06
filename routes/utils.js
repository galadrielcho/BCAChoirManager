var database = require('../db');
const router = require('express').Router();

module.exports = function () {
    /*  "/api/status"
    *   GET: Get server status
    */
   
    router.get("/", function (req, res) {
        console.log("test");
        folderDir = './../frontend/bca-choir-manager/dist/bca-choir-manager'
        res.sendFile(path.join(folderDir, '/index.html'));
    });
    

    /*  "/api/status"
    *   GET: Get server status
    */
   
    router.get("/api/status", function (req, res) {
        res.status(200).json({ status: "UP" });
    });


    return router;
}
    