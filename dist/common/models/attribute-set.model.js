"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var attributes_model_1 = require("./attributes.model");
var AttributeSet = /** @class */ (function () {
    function AttributeSet(type, attrSetName, $attrSetData) {
        this.type = type;
        this.attrSetName = attrSetName;
        this.$attrSetData = $attrSetData;
    }
    AttributeSet.prototype.getAttributes = function () {
        var attributes = new attributes_model_1.default("initialSet", this.$attrSetData);
        return attributes;
    };
    AttributeSet.prototype.isAttributeSetInheritDefault = function () {
        return this.$attrSetData.attr("inherits-default") === 'true';
    };
    return AttributeSet;
}());
exports.default = AttributeSet;
