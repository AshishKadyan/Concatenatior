"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var comp_model_1 = require("./comp.model");
var State = /** @class */ (function () {
    function State(stateId, $stateData) {
        this.$stateData = $stateData;
        this.stateId = stateId;
    }
    State.prototype.tagStartState = function () {
        this.$stateData.attr('isStart', true);
    };
    State.prototype.tagEndState = function () {
        this.$stateData.attr('islast', true);
    };
    State.prototype.getStateStepNumber = function () {
        return this.$stateData.attr('txt');
    };
    State.prototype.getComp = function (id) {
        var $compData = this.$stateData.find("comps > comp[id=\"" + id + "\"]");
        var comp = new comp_model_1.default(id, $compData);
        return comp;
    };
    State.prototype.removeComp = function (id) {
        this.$stateData.find("comps > comp[id=\"" + id + "\"]").remove();
    };
    State.prototype.getCompsInState = function () {
        var $compsData;
        var compIds = [];
        $compsData = this.$stateData.find("comps > comp");
        for (var i = 0; i < $compsData.length; i++) {
            compIds.push($compsData.eq(i).attr("id"));
        }
        return compIds;
    };
    State.prototype.setStateStepNumber = function (stepNo) {
        this.$stateData.attr('txt', stepNo);
    };
    State.prototype.removeStateStepNumber = function () {
        this.$stateData.attr('txt', null);
    };
    State.prototype.updateState = function (stateId) {
        this.$stateData.attr("id", stateId);
    };
    return State;
}());
exports.default = State;
