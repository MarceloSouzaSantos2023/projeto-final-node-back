import { BaseEntity } from "typeorm";
export declare class UserEntity extends BaseEntity {
    id: number;
    email: string;
    password: string;
    roleId: string;
    isDelete: boolean;
}
