"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var attributes_model_1 = require("./attributes.model");
var attribute_set_model_1 = require("./attribute-set.model");
var event_model_1 = require("./event.model");
var MODE = {
    'Reference': 'reference',
    'Edit': 'edit',
    'New': 'new',
    'Remove': 'remove'
};
var ATTR_CATEGORY = {
    'Initial': 'initial',
    'Final': 'final'
};
var ATTRSETS_NAME = {
    'Reset': 'reset'
};
var Comp = /** @class */ (function () {
    function Comp(compId, $compData) {
        this.$compData = $compData;
        this.compId = compId;
        this.mode = MODE;
        this.attr_category = ATTR_CATEGORY;
        this.attrsets_name = ATTRSETS_NAME;
    }
    Comp.prototype.updateCompId = function (id) {
        this.$compData.attr("id", id);
    };
    Comp.prototype.getCompMode = function () {
        return this.$compData.attr("mode");
    };
    Comp.prototype.getHostId = function () {
        return this.$compData.attr("hostid");
    };
    Comp.prototype.updateHostId = function (id) {
        this.$compData.attr("hostid", id);
    };
    Comp.prototype.setCompMode = function (modeValue) {
        if (this.mode[modeValue]) {
            this.$compData.attr('mode', this.mode[modeValue]);
        }
    };
    Comp.prototype.getReferredStateId = function () {
        return this.$compData.attr("ref-state");
    };
    Comp.prototype.removeReferredStateId = function () {
        this.$compData.attr("ref-state", null);
    };
    Comp.prototype.getSizeAndPosition = function (addIfNotPresent) {
        var $sizeAndPositionData = this.getAttributes("sizeandpos", addIfNotPresent);
        if (!$sizeAndPositionData.length) {
            return null;
        }
        var attributes = new attributes_model_1.default("sizeandpos", $sizeAndPositionData);
        return attributes;
    };
    Comp.prototype.getInitialAttributes = function (addIfNotPresent) {
        var $initialAttrsData = this.getAttributes("initialattrs", addIfNotPresent);
        if (!$initialAttrsData.length) {
            return null;
        }
        var attributes = new attributes_model_1.default("initial", $initialAttrsData);
        return attributes;
    };
    Comp.prototype.getInitialAttributeSet = function (attrSetName) {
        var $attrSetData = this.$compData.find("initialattributesets attributeset[name=\"" + attrSetName + "\"]");
        var initialAttributeSet = new attribute_set_model_1.default("initial", attrSetName, $attrSetData);
        return initialAttributeSet;
    };
    Comp.prototype.getFinalAttributeSet = function (attrSetName) {
        var $attrSetData = this.$compData.find("finalattributesets attributeset[name=\"" + attrSetName + "\"]");
        var initialAttributeSet = new attribute_set_model_1.default("final", attrSetName, $attrSetData);
        return initialAttributeSet;
    };
    Comp.prototype.removeAttributeSet = function (category, attrSetName) {
        if (this.attr_category[category]) {
            this.$compData.find(this.attr_category[category] + "attributesets attributeset[name=\"" + attrSetName + "\"]").remove();
        }
    };
    Comp.prototype.getAttributeSets = function (category) {
        if (this.attr_category[category]) {
            var $attributeSets = this.$compData.find(this.attr_category[category] + "attributesets attributeset");
            var attributeSetNames = [];
            for (var i = 0; i < $attributeSets.length; i++) {
                attributeSetNames.push($attributeSets.eq(i).attr('name'));
            }
            return attributeSetNames;
        }
    };
    Comp.prototype.removeFinalAttributes = function () {
        this.$compData.find("finalattrs").remove();
    };
    Comp.prototype.removeAttributeSets = function (category) {
        if (this.attr_category[category]) {
            this.$compData.find(this.attr_category[category] + "attributesets").remove();
        }
    };
    Comp.prototype.getEvents = function () {
        var $events = this.$compData.find("events event");
        var eventIds = [];
        for (var i = 0; i < $events.length; i++) {
            eventIds.push($events.eq(i).attr("id"));
        }
        return eventIds;
    };
    Comp.prototype.removeEvents = function () {
        this.$compData.find("events").remove();
    };
    Comp.prototype.getEvent = function (id) {
        var $eventData = this.$compData.find("events event[id=\"" + id + "\"]");
        var event = new event_model_1.default(id, $eventData);
        return event;
    };
    Comp.prototype.removeEvent = function (id) {
        this.$compData.find("events event[id=\"" + id + "\"]").remove();
    };
    Comp.prototype.addAttributeSet = function (category, attrName) {
        if (this.attr_category[category]) {
            this.$compData.find(this.attr_category[category] + "attributesets").append("<attributeset name=\"" + attrName + "\"></attributeset>");
        }
    };
    Comp.prototype.getComponentAttributes = function () {
        return this.$compData.attr();
    };
    Comp.prototype.addComponentAttribute = function (attrName, attrValue) {
        this.$compData.attr(attrName, attrValue);
    };
    Comp.prototype.getAttributes = function (type, addIfNotPresent) {
        var $attributesdata = this.$compData.find("" + type);
        if (!$attributesdata.length) {
            if (addIfNotPresent) {
                this.$compData.append("<" + type + "></" + type + ">");
                $attributesdata = this.$compData.find("" + type);
            }
        }
        return $attributesdata;
    };
    return Comp;
}());
exports.default = Comp;
