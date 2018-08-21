"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var StepData = /** @class */ (function () {
    function StepData(stepNo, $step) {
        this.$stepData = $step;
        this.stepNo = stepNo;
    }
    StepData.prototype.getPrimaryStartState = function () {
        return this.$stepData.attr('StateStart');
    };
    StepData.prototype.setPrimaryStartState = function (id) {
        this.$stepData.attr('StateStart', id);
    };
    StepData.prototype.updateStep = function (stepId) {
        this.$stepData.attr("id", stepId);
    };
    return StepData;
}());
exports.default = StepData;
