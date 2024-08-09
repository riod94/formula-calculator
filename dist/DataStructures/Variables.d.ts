import MapArrayObject from "src/utils/MapArrayObject";
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
    constructor();
}
