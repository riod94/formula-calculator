export default class MapArrayObject {
    [key: string]: any;
    constructor(...args: any[]);
    set(name: string, value: any): any;
    get(name: string): any;
    toArray(): any[];
    keys(): string[];
    values(): any[];
    toString(): string;
    keyToString(): string;
    count(): number;
    sum(): any;
}
