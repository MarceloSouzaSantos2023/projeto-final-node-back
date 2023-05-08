import { BaseEntity } from "typeorm";
export declare class RoleEntity extends BaseEntity {
    id: string;
    name: string;
    isDelete: boolean;
}
