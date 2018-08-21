"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cheerio_util_1 = require("./cheerio.util");
var SIM5Util = /** @class */ (function () {
    function SIM5Util() {
    }
    SIM5Util.prototype.getTaskRepositoryPath = function (sim5ContentServerURL) {
        var url = sim5ContentServerURL + "/XMLs/TaskRepository.xml";
        return url;
    };
    SIM5Util.prototype.getXMLPathFromTaskRepository = function (taskRepo, sim5ContentServerURL, taskId) {
        try {
            var $taskRepo = cheerio_util_1.default.loadXML(taskRepo, { xmlMode: true });
            var path = $taskRepo("tasks task[id=\"" + taskId + "\"]").attr('xmlPath');
            var taskXMLPath = sim5ContentServerURL + "/XMLs/" + path;
            return taskXMLPath;
        }
        catch (err) {
            console.log("Cheerio Error! " + err);
            throw err;
        }
    };
    SIM5Util.instantiateSim5UtilClass = function () {
        SIM5Util.SIM5UtilObject = SIM5Util.SIM5UtilObject || new SIM5Util();
        return SIM5Util.SIM5UtilObject;
    };
    return SIM5Util;
}());
var SIM5UtilObject = SIM5Util.instantiateSim5UtilClass();
exports.default = SIM5UtilObject;
