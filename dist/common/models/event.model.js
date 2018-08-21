"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Event = /** @class */ (function () {
    function Event(eventId, $eventData) {
        this.$eventData = $eventData;
        this.eventId = eventId;
    }
    Event.prototype.getEventFollowupState = function () {
        return this.$eventData.attr('followup');
    };
    Event.prototype.setEventFollowupState = function (followupStateId) {
        this.$eventData.attr('followup', followupStateId);
    };
    Event.prototype.getvalidateFollowupStates = function () {
        var $validateNodes = this.$eventData.find("validate");
        var followupStateIds = [];
        for (var i = 0; i < $validateNodes.length; i++) {
            var id = $validateNodes.eq(i).attr("followup");
            if ((id) || (id === "")) {
                followupStateIds.push(id);
            }
        }
        return followupStateIds;
    };
    Event.prototype.removeValidateFollowupState = function (followupId) {
        this.$eventData.find("validate[followup=\"" + followupId + "\"]").remove();
    };
    Event.prototype.setValidateFollowupState = function (oldFollowupId, newFollowupId) {
        this.$eventData.find("validate[followup=\"" + oldFollowupId + "\"]").attr("followup", newFollowupId);
    };
    Event.prototype.getValidateCompIds = function () {
        var $validateCompNodes = this.$eventData.find("validate comp");
        var validateCompIds = [];
        for (var i = 0; i < $validateCompNodes.length; i++) {
            var compId = $validateCompNodes.eq(i).attr("id");
            if (validateCompIds.indexOf(compId) === -1) {
                validateCompIds.push(compId);
            }
        }
        return validateCompIds;
    };
    Event.prototype.setValidateCompId = function (oldCompId, newCompId) {
        var $validateCompNodes = this.$eventData.find("validate comp[id=\"" + oldCompId + "\"]");
        for (var i = 0; i < $validateCompNodes.length; i++) {
            $validateCompNodes.eq(i).attr("id", newCompId);
        }
    };
    return Event;
}());
exports.default = Event;
