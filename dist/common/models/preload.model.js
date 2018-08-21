"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Preload = /** @class */ (function () {
    function Preload($preloadData) {
        this.$preloadData = $preloadData;
    }
    Preload.prototype.getCompIds = function () {
        var $comp = this.$preloadData.find("comps comp");
        var compIds = [];
        for (var i = 0; i < $comp.length; i++) {
            compIds.push($comp.eq(i).attr("id"));
        }
        return compIds;
    };
    Preload.prototype.removeComp = function (compId) {
        this.$preloadData.find("comps comp[id=\"" + compId + "\"]").remove();
    };
    Preload.prototype.updateCompId = function (oldCompId, newCompId) {
        this.$preloadData.find("comps comp[id=\"" + oldCompId + "\"]").attr("id", newCompId);
    };
    Preload.prototype.getCompName = function (compId) {
        return this.$preloadData.find("comps comp[id=\"" + compId + "\"]").attr("name");
    };
    return Preload;
}());
exports.default = Preload;
