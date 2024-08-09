"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MapArrayObject_1 = __importDefault(require("src/utils/MapArrayObject"));
class Variables extends MapArrayObject_1.default {
    constructor() {
        super();
        this.component = new MapArrayObject_1.default();
        this.department = new MapArrayObject_1.default();
        this.function = new MapArrayObject_1.default();
        this.job_level = new MapArrayObject_1.default();
        this.job_position = new MapArrayObject_1.default();
        this.join_status = new MapArrayObject_1.default();
        this.time_off_type = new MapArrayObject_1.default();
        this.work_group = new MapArrayObject_1.default();
        this.work_shift = new MapArrayObject_1.default();
    }
}
exports.default = Variables;
