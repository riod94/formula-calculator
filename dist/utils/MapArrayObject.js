"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MapArrayObject {
    constructor(...args) {
        if (args.length > 0) {
            Object.assign(this, ...args);
        }
        return this;
    }
    set(name, value) {
        this[name] = value;
        return value;
    }
    get(name) {
        return this[name] || null;
    }
    toArray() {
        return Object.values(this);
    }
    keys() {
        return Object.keys(this);
    }
    values() {
        return Object.values(this);
    }
    toString() {
        return this.values().join(' ');
    }
    keyToString() {
        return this.keys().join(' ');
    }
    count() {
        return this.values().length;
    }
    sum() {
        return this.values().reduce((acc, curr) => acc + curr, 0);
    }
}
exports.default = MapArrayObject;
