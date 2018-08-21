"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vkbeautify = require('vkbeautify');
var step_data_model_1 = require("./step-data.model");
var state_model_1 = require("./state.model");
var preload_model_1 = require("./preload.model");
var cheerio_util_1 = require("../utils/cheerio.util");
var graph_util_1 = require("../utils/graph.util");
var SIM5XMLModel = /** @class */ (function () {
    function SIM5XMLModel(sim5XML) {
        this.$sim5XML = cheerio_util_1.default.loadXML(sim5XML, { xmlMode: true, normalizeWhitespace: true, });
        console.log("Creating graph for task");
        this.createTaskGraph();
    }
    SIM5XMLModel.prototype.getStepXML = function () {
        var xml = cheerio_util_1.default.getXML(this.$sim5XML);
        return vkbeautify.xml(xml).trim();
    };
    SIM5XMLModel.prototype.setStepNumber = function (stepNumber) {
        this.stepNumber = stepNumber;
    };
    SIM5XMLModel.prototype.getStepNumber = function () {
        return this.stepNumber;
    };
    SIM5XMLModel.prototype.getSteps = function () {
        var steps = this.$sim5XML('task').find('texts_formatted txt');
        var stepIds = [];
        for (var i = 0; i < steps.length; i++) {
            stepIds.push(steps.eq(i).attr("id"));
        }
        return stepIds;
    };
    SIM5XMLModel.prototype.getStates = function (stepNumber) {
        var states;
        if (stepNumber) {
            states = this.$sim5XML('task').find("states state[txt=\"" + stepNumber + "\"]");
        }
        else {
            states = this.$sim5XML('task').find("states state");
        }
        var stateIds = [];
        for (var i = 0; i < states.length; i++) {
            stateIds.push(states.eq(i).attr("id"));
        }
        return stateIds;
    };
    SIM5XMLModel.prototype.getIncomingStates = function (stateId) {
        return graph_util_1.default.inEdges(this.graph, stateId);
    };
    SIM5XMLModel.prototype.getOutgoingStates = function (stateId) {
        return graph_util_1.default.outEdges(this.graph, stateId);
    };
    SIM5XMLModel.prototype.getTaggedEndStates = function () {
        var endStates = this.$sim5XML('task').find("states state[islast=true]");
        var endStateIds = [];
        for (var i = 0; i < endStates.length; i++) {
            var endStateId = endStates.eq(i).attr("id");
            endStateIds.push(endStateId);
        }
        return endStateIds;
    };
    SIM5XMLModel.prototype.createTaskGraph = function () {
        this.graph = graph_util_1.default.getGraphObject();
        this.initializeStateTraversalGraph();
        // console.log(this.graph.nodes());
        // console.log(this.graph.edges());
    };
    SIM5XMLModel.prototype.initializeStateTraversalGraph = function () {
        var taskStateIds = this.getStateIdsUsedInTask();
        for (var i = 0; i < taskStateIds.length; i++) {
            var followupSateIds = this.getFollowupStateIds(taskStateIds[i]);
            if (followupSateIds) {
                for (var j = 0; j < followupSateIds.length; j++) {
                    if (taskStateIds.indexOf(followupSateIds[j]) !== -1) {
                        graph_util_1.default.createEdge(this.graph, taskStateIds[i], followupSateIds[j]);
                    }
                }
            }
        }
    };
    SIM5XMLModel.prototype.getStateIdsUsedInTask = function () {
        var stateId = [];
        var states = this.$sim5XML('task').find("state");
        for (var i = 0; i < states.length; i++) {
            stateId.push(states.eq(i).attr("id"));
        }
        return stateId;
    };
    SIM5XMLModel.prototype.getFollowupStateIds = function (stateId) {
        var followupStateIds = [];
        var nodesWithFollowup = this.$sim5XML('task').find("state[id='" + stateId + "'] event[followup], state[id='" + stateId + "'] event validate[followup]");
        for (var i = 0; i < nodesWithFollowup.length; i++) {
            var followupStateId = nodesWithFollowup.eq(i).attr("followup");
            if (followupStateIds.indexOf(followupStateId) === -1) {
                followupStateIds.push(followupStateId);
            }
        }
        return followupStateIds;
    };
    SIM5XMLModel.prototype.getStepData = function (stepNo) {
        var $stepData = this.$sim5XML('task').find("texts_formatted txt[id=\"" + stepNo + "\"]");
        var stepData = new step_data_model_1.default(stepNo, $stepData);
        return stepData;
    };
    SIM5XMLModel.prototype.getState = function (stateId) {
        var $stateData = this.$sim5XML('task').find("states state[id=\"" + stateId + "\"]");
        var state = new state_model_1.default(stateId, $stateData);
        return state;
    };
    SIM5XMLModel.prototype.getTaggedStartStates = function () {
        var startStates = this.$sim5XML('task').find("states state[isStart=true]");
        var startStateIds = [];
        for (var i = 0; i < startStates.length; i++) {
            startStateIds.push(startStates.eq(i).attr("id"));
        }
        return startStateIds;
    };
    SIM5XMLModel.prototype.getPreload = function () {
        var $preloadData = this.$sim5XML("task preload");
        var preload = new preload_model_1.default($preloadData);
        return preload;
    };
    SIM5XMLModel.prototype.removeState = function (stateId) {
        this.$sim5XML('task').find("states state[id=\"" + stateId + "\"]").remove();
    };
    SIM5XMLModel.prototype.removeStep = function (stepNo) {
        this.$sim5XML('task').find("texts_formatted txt[id=\"" + stepNo + "\"]").remove();
    };
    return SIM5XMLModel;
}());
exports.default = SIM5XMLModel;
