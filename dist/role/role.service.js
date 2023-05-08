"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const role_entity_1 = require("./role.entity");
const typeorm_2 = require("typeorm");
const rxjs_1 = require("rxjs");
const nestjs_typeorm_paginate_1 = require("nestjs-typeorm-paginate");
let RoleService = class RoleService {
    async onModuleInit() {
        await this.insertBaseRole();
    }
    async findAllRole(payload) {
        try {
            const roles = await (0, rxjs_1.from)((0, nestjs_typeorm_paginate_1.paginate)(this.repository, payload))
                .pipe((0, rxjs_1.map)((page) => {
                return page;
            }));
            const pagination = await (0, rxjs_1.firstValueFrom)(roles);
            return {
                items: pagination.items, links: "", messages: [], pagination: pagination.meta, status: common_1.HttpStatus.OK
            };
        }
        catch (error) {
            throw error;
        }
    }
    async findRoleByName(payload) {
        return this.buildingResponseSuccess(await this.findRoleBy(payload, "name"), common_1.HttpStatus.OK, []);
    }
    async findRoleById(payload) {
        return this.buildingResponseSuccess(await this.findRoleBy(payload, "id"), common_1.HttpStatus.OK, []);
    }
    async removeRoleById(payload) {
        try {
            let response = await this.repository.createQueryBuilder(process.env.DATABASE_NAME)
                .where(`${process.env.DATABASE_NAME}.id = :id`, { id: payload })
                .getOne();
            if (response) {
                response.isDelete = !(response === null || response === void 0 ? void 0 : response.isDelete);
                await this.repository.createQueryBuilder()
                    .update(role_entity_1.RoleEntity).set(response).where("id = :id", { id: response === null || response === void 0 ? void 0 : response.id }).execute();
                return { status: common_1.HttpStatus.OK, messages: [] };
            }
            return { status: common_1.HttpStatus.NOT_FOUND, messages: [] };
        }
        catch (error) {
            throw error;
        }
    }
    async saveRole(payload) {
        try {
            const role = await this.repository.save(payload);
            return this.buildingResponseSuccess(role, common_1.HttpStatus.OK, []);
        }
        catch (error) {
            throw error;
        }
    }
    async updateRole(payload) {
        try {
            let role;
            if (payload === null || payload === void 0 ? void 0 : payload.id) {
                let response = await this.repository.createQueryBuilder(process.env.DATABASE_NAME)
                    .where(`${process.env.DATABASE_NAME}.id = :id`, { id: payload.id })
                    .andWhere(`${process.env.DATABASE_NAME}.isDelete = false`)
                    .getOne();
                if (response) {
                    role = await this.repository.createQueryBuilder()
                        .update(role_entity_1.RoleEntity).set(response).where("id = :id", { id: response === null || response === void 0 ? void 0 : response.id }).execute();
                }
                else {
                    return this.buildingResponseSuccess(role, common_1.HttpStatus.NOT_FOUND, []);
                }
            }
            return this.buildingResponseSuccess(role, common_1.HttpStatus.OK, []);
        }
        catch (error) {
            throw error;
        }
    }
    async findRoleBy(payload, type) {
        try {
            return await this.repository
                .createQueryBuilder(process.env.DATABASE_NAME)
                .where(`${process.env.DATABASE_NAME}.${type} = :${type}`, { [type]: payload[type] })
                .andWhere(`${process.env.DATABASE_NAME}.isDelete = false`)
                .getOne();
        }
        catch (error) {
            throw error;
        }
    }
    async insertBaseRole() {
        try {
            const response = await this.findRoleById({ id: "1" });
            if (!response.role) {
                await this.repository.save({ id: "1", name: "admin", isDelete: false });
            }
        }
        catch (error) {
            throw error;
        }
    }
    buildingResponseSuccess(role, status, messages) {
        return { role: role, status: status, messages: messages };
    }
};
__decorate([
    (0, typeorm_1.InjectRepository)(role_entity_1.RoleEntity),
    __metadata("design:type", typeorm_2.Repository)
], RoleService.prototype, "repository", void 0);
RoleService = __decorate([
    (0, common_1.Injectable)()
], RoleService);
exports.RoleService = RoleService;
//# sourceMappingURL=role.service.js.map