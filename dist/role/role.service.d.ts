import { OnModuleInit } from "@nestjs/common";
export declare class RoleService implements OnModuleInit {
    private readonly repository;
    onModuleInit(): Promise<any>;
    findAllRole(payload: Request | any): Promise<any>;
    findRoleByName(payload: Request | any): Promise<any>;
    findRoleById(payload: Request | any): Promise<any>;
    removeRoleById(payload: Request | any): Promise<any>;
    saveRole(payload: Request | any): Promise<any>;
    updateRole(payload: Request | any): Promise<any>;
    private findRoleBy;
    private insertBaseRole;
    private buildingResponseSuccess;
}
