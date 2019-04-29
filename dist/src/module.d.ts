import 'reflect-metadata';
declare const Module_base: any;
export default class Module extends Module_base {
    private list;
    private instance;
    constructor(list: Object[], instance?: Object[] | Module);
    getScope(target: any): any;
    has(target: any, options: any[]): object | void;
    instantiate(target: any, options?: any[]): Object;
    build(): any[];
}
export {};
