import { BaseEntity } from "typeorm";
export declare class ProductEntity extends BaseEntity {
    id: string;
    name: string;
    isDelete: boolean;
}
