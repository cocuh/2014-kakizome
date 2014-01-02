/**
 * Created by cocu on 1/2/14.
 */

SVGObj = function (elem) {
    this.elem = elem;
    this.setId = function (id) {
        this.elem.id = id;
    };
    this.setAttribute = function (key, value) {
        return this.elem.setAttributeNS(null, key, value)
    };
    this.setAttributeNS = function (namespace,key, value) {
        return this.elem.setAttributeNS(namespace, key, value)
    };
    this.setAttrDict = function (d) {
        var keys = Object.keys(d);
        for (var i = 0; i < keys.length; i++) {
            this.setAttribute(keys[i], d[keys[i]]);
        }
    };
    this.appendChild = function(child){
        this.elem.appendChild(child);
    };
};

SVGObj.xmlns = "http://www.w3.org/2000/svg";
SVGObj.xlinkns = "http://www.w3.org/1999/xlink";
SVGObj.createElement = function (tagname) {
    var elem = document.createElementNS(SVGObj.xmlns, tagname);
    var obj = new SVGObj(elem);
    var res = function () {
        return obj.elem
    };
    res.__proto__ = obj;
    return res;
};