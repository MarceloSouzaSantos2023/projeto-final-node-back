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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const user_entity_1 = require("./user.entity");
const rxjs_1 = require("rxjs");
const nestjs_typeorm_paginate_1 = require("nestjs-typeorm-paginate");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let UserService = class UserService {
    async onModuleInit() {
        await this.insertBaseUser();
    }
    async findAllUser(payload) {
        try {
            const users = await (0, rxjs_1.from)((0, nestjs_typeorm_paginate_1.paginate)(this.repository, payload))
                .pipe((0, rxjs_1.map)((page) => {
                return page;
            }));
            const pagination = await (0, rxjs_1.firstValueFrom)(users);
            return {
                items: pagination.items,
                links: null,
                pagination: pagination.meta,
                status: common_1.HttpStatus.OK,
                messages: []
            };
        }
        catch (error) {
            throw error;
        }
    }
    async findUserByEmail(payload) {
        return this.buildingResponseSuccess(await this.findUserBy(payload, "email"), common_1.HttpStatus.OK, []);
    }
    async findUserById(payload) {
        return this.buildingResponseSuccess(await this.findUserBy(payload, "id"), common_1.HttpStatus.OK, []);
    }
    async findUserBy(payload, type) {
        try {
            const response = await this.repository
                .createQueryBuilder(String(process.env.DATABASE_NAME))
                .where(`${process.env.DATABASE_NAME}.${type} = :${type}`, { [type]: payload[type] })
                .getOne();
            return response;
        }
        catch (error) {
            throw error;
        }
    }
    async removeUserById(payload) {
        try {
            const query = JSON.parse(payload.query);
            let response = await this.repository.createQueryBuilder(process.env.DATABASE_NAME)
                .where(`${process.env.DATABASE_NAME}.id = :id`, { id: query.id })
                .getOne();
            if (response) {
                response.isDelete = !(response === null || response === void 0 ? void 0 : response.isDelete);
                await this.repository.createQueryBuilder()
                    .update(user_entity_1.UserEntity).set(response).where("id = :id", { id: response === null || response === void 0 ? void 0 : response.id }).execute();
                return { status: common_1.HttpStatus.OK, messages: [] };
            }
            return { status: common_1.HttpStatus.NOT_FOUND, messages: [] };
        }
        catch (error) {
            throw error;
        }
    }
    async updateUser(payload) {
        try {
            let role;
            if (payload === null || payload === void 0 ? void 0 : payload.id) {
                let response = await this.repository.createQueryBuilder(process.env.DATABASE_NAME)
                    .where(`${process.env.DATABASE_NAME}.id = :id`, { id: payload.id })
                    .andWhere(`${process.env.DATABASE_NAME}.isDelete = false`)
                    .getOne();
                if (response) {
                    role = await this.repository.createQueryBuilder()
                        .update(user_entity_1.UserEntity).set(response).where("id = :id", { id: response === null || response === void 0 ? void 0 : response.id }).execute();
                }
            }
            else {
                return this.buildingResponseSuccess(role, common_1.HttpStatus.NOT_FOUND, []);
            }
            return this.buildingResponseSuccess(role, common_1.HttpStatus.OK, []);
        }
        catch (error) {
            throw error;
        }
    }
    async saveUser(payload) {
        try {
            payload.isDelete = false;
            const role = await this.repository.save(payload);
            return this.buildingResponseSuccess(role, common_1.HttpStatus.OK, []);
        }
        catch (error) {
            throw error;
        }
    }
    async insertBaseUser() {
        try {
            const response = await this.findUserById({ id: "1" });
            if (response.user === undefined || response.user === null) {
                await this.repository.insert({
                    id: 1, password: "$2a$10$CrvQB6BbIJlAdDrDITITH.QqlOUqOuhcmzMbkyVHPOlvRRTjQhr3i",
                    email: "admin@gmail.com", roleId: "1", isDelete: false
                });
            }
        }
        catch (error) {
            throw error;
        }
    }
    buildingResponseSuccess(user, status, messages) {
        return { user: user, status: status, messages: messages };
    }
};
__decorate([
    (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity),
    __metadata("design:type", typeorm_2.Repository)
], UserService.prototype, "repository", void 0);
UserService = __decorate([
    (0, common_1.Injectable)()
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map