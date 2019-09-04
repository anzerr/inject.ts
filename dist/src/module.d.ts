import 'reflect-metadata';
declare const Module_base: any;
export default class Module extends Module_base {
    private list;
    private instance;
    constructor(list: Record<string, any>[], instance?: Record<string, any>[] | Module);
    getScope(target: any): any[];
    has(target: any, options: any[]): object | void;
    instantiate(target: any, o?: any[]): Record<string, any>;
    build(): any;
}
export {};
