"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Attributes = /** @class */ (function () {
    function Attributes(type, $attributesData) {
        this.type = type;
        this.$attributesData = $attributesData;
    }
    Attributes.prototype.getAttributesAndValues = function () {
        var attrs = {};
        var $attributes = this.$attributesData.find("attr");
        for (var i = 0; i < $attributes.length; i++) {
            var attrName = $attributes.eq(i).attr('name');
            var attrValue = $attributes.eq(i).attr('value');
            if (!attrs[attrName]) {
                attrs[attrName] = [];
            }
            attrs[attrName].push(attrValue);
        }
        return attrs;
    };
    Attributes.prototype.addAttribute = function (attrName, attrValue) {
        attrValue = attrValue.replace(/"/g, "&quot;");
        this.$attributesData.append("<attr name=\"" + attrName + "\" value=\"" + attrValue + "\" />");
    };
    Attributes.prototype.setAttribute = function (attrName, attrValue) {
        attrValue = attrValue.replace(/"/g, "&quot;");
        this.$attributesData.find("attr[name=\"" + attrName + "\"]").attr("value", attrValue);
    };
    Attributes.prototype.removeAttribute = function (attrName, attrValue) {
        var $attributes = this.$attributesData.find("attr[name=\"" + attrName + "\"]");
        for (var i = 0; i < $attributes.length; i++) {
            if ($attributes.eq(i).attr('value') === attrValue) {
                $attributes.eq(i).remove();
            }
        }
    };
    Attributes.prototype.removeDuplicateAttributes = function () {
        var $attributes = this.$attributesData.find("attr");
        var uniquItems = [];
        for (var i = 0; i < $attributes.length; i++) {
            var itemObj = {
                'name': $attributes.eq(i).attr("name").toLowerCase(),
                'value': $attributes.eq(i).attr("value").toLowerCase()
            };
            var item = JSON.stringify(itemObj);
            if (uniquItems.indexOf(item) === -1) {
                uniquItems.push(item);
            }
            else {
                $attributes.eq(i).remove();
            }
        }
    };
    return Attributes;
}());
exports.default = Attributes;
