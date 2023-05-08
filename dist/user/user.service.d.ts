import { OnModuleInit } from "@nestjs/common";
export declare class UserService implements OnModuleInit {
    private readonly repository;
    onModuleInit(): Promise<any>;
    findAllUser(payload: Request | any): Promise<any>;
    findUserByEmail(payload: Request | any): Promise<any>;
    findUserById(payload: Request | any): Promise<any>;
    private findUserBy;
    removeUserById(payload: Request | any): Promise<any>;
    updateUser(payload: Request | any): Promise<any>;
    saveUser(payload: Request | any): Promise<any>;
    private insertBaseUser;
    private buildingResponseSuccess;
}
