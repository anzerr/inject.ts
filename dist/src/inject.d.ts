import 'reflect-metadata';
declare const Inject: (dep: (() => Record<string, any>) | Record<string, any>) => (target: any, key: string, index?: number) => void;
export default Inject;
