import 'reflect-metadata';
declare const Module_base: any;
export default class Module extends Module_base {
    private list;
    private instance;
    constructor(list: Object[], instance?: Object[] | Module);
    getScope(target: any): {};
    has(target: any): object | void;
    instantiate(target: any, options?: object): Object;
    build(): any[];
}
export {};
