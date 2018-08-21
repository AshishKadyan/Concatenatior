"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var graph = require('graphlib').Graph;
var GraphUtil = /** @class */ (function () {
    function GraphUtil() {
    }
    GraphUtil.prototype.getGraphObject = function () {
        return new graph();
    };
    GraphUtil.prototype.createNode = function (graph, nodeId, nodeValue) {
        graph.setNode(nodeId, nodeValue);
    };
    GraphUtil.prototype.createEdge = function (graph, source, target) {
        graph.setEdge(source, target);
    };
    GraphUtil.prototype.ifNodeExists = function (graph, nodeId) {
        return graph.hasNode(nodeId);
    };
    GraphUtil.prototype.ifEdgeExists = function (graph, source, target) {
        return graph.hasEdge(source, target);
    };
    GraphUtil.prototype.inEdges = function (graph, nodeId) {
        return graph.inEdges(nodeId).map(function (obj) { return obj.v; });
    };
    GraphUtil.prototype.outEdges = function (graph, nodeId) {
        return graph.outEdges(nodeId).map(function (obj) { return obj.w; });
    };
    GraphUtil.instantiateGraphUtilClass = function () {
        GraphUtil.graphUtilObject = GraphUtil.graphUtilObject || new GraphUtil();
        return GraphUtil.graphUtilObject;
    };
    return GraphUtil;
}());
var graphUtilObject = GraphUtil.instantiateGraphUtilClass();
exports.default = graphUtilObject;
