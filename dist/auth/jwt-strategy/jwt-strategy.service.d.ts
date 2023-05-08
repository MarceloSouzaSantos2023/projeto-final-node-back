declare const JwtStrategyService_base: new (...args: any[]) => any;
export declare class JwtStrategyService extends JwtStrategyService_base {
    constructor();
    validate(payload: any): Promise<any>;
}
export {};
