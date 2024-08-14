import MapArrayObject from "../utils/MapArrayObject";

export default class Variables extends MapArrayObject {
    component: MapArrayObject;
    department: MapArrayObject;
    function: MapArrayObject;
    job_level: MapArrayObject;
    job_position: MapArrayObject;
    join_status: MapArrayObject;
    time_off_type: MapArrayObject;
    work_group: MapArrayObject;
    work_shift: MapArrayObject;

    [key: string]: any;

    constructor() {
        super();
        this.component = new MapArrayObject();
        this.department = new MapArrayObject();
        this.function = new MapArrayObject();
        this.job_level = new MapArrayObject();
        this.job_position = new MapArrayObject();
        this.join_status = new MapArrayObject();
        this.time_off_type = new MapArrayObject();
        this.work_group = new MapArrayObject();
        this.work_shift = new MapArrayObject();
    }
}