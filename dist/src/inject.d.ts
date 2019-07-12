import 'reflect-metadata';
declare const Inject: (dep: Object | (() => Object)) => (target: any, key: string, index?: number) => void;
export default Inject;
