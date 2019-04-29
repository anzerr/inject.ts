import 'reflect-metadata';
declare const Param: (...args: any[]) => {
    (target: Function): void;
    (target: Object, propertyKey: string | symbol): void;
};
export default Param;
