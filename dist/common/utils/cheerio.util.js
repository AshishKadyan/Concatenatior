"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cheerio = require('cheerio');
var CheerioUtil = /** @class */ (function () {
    function CheerioUtil() {
    }
    CheerioUtil.prototype.loadXML = function (xml, options) {
        var $xml = cheerio.load(xml, options);
        return $xml;
    };
    CheerioUtil.prototype.getXML = function ($xml) {
        return $xml.xml();
    };
    CheerioUtil.instantiateCheerioUtilClass = function () {
        CheerioUtil.cheerioUtilObject = CheerioUtil.cheerioUtilObject || new CheerioUtil();
        return CheerioUtil.cheerioUtilObject;
    };
    return CheerioUtil;
}());
var cheerioUtilObject = CheerioUtil.instantiateCheerioUtilClass();
exports.default = cheerioUtilObject;
