import { OnModuleInit } from "@nestjs/common";
export declare class ProductService implements OnModuleInit {
    private readonly repository;
    onModuleInit(): Promise<any>;
    findAllProduct(payload: Request | any): Promise<any>;
    findProductByName(payload: Request | any): Promise<any>;
    findProductById(payload: Request | any): Promise<any>;
    removeProductById(payload: Request | any): Promise<any>;
    saveProduct(payload: Request | any): Promise<any>;
    updateProduct(payload: Request | any): Promise<any>;
    private findProductBy;
    private insertBaseProduct;
    private buildingResponseSuccess;
}
