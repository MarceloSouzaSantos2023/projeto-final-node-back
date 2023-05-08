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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleController = void 0;
const common_1 = require("@nestjs/common");
const role_service_1 = require("./role.service");
const role_decorator_1 = require("../auth/jwt-strategy/role.decorator");
const jwt_guard_1 = require("../auth/jwt-strategy/jwt.guard");
const role_guard_1 = require("../auth/jwt-strategy/role.guard");
let RoleController = class RoleController {
    async getRoles(query) {
        return await this.service.findAllRole(query);
    }
    async getRoleByName(name) {
        return await this.service.findRoleByName({ name });
    }
    async getRoleById(id) {
        return await this.service.findRoleById({ id });
    }
    async deleteRoleById(id) {
        return await this.service.removeRoleById(id);
    }
    async postRole(request) {
        return await this.service.saveRole(request);
    }
    async putRole(request, id) {
        const body = request;
        body.id = id || null;
        return await this.service.updateRole(body);
    }
};
__decorate([
    (0, common_1.Inject)(role_service_1.RoleService),
    __metadata("design:type", role_service_1.RoleService)
], RoleController.prototype, "service", void 0);
__decorate([
    (0, role_decorator_1.Role)("admin"),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard, role_guard_1.RoleGuard),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "getRoles", null);
__decorate([
    (0, role_decorator_1.Role)("admin"),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard, role_guard_1.RoleGuard),
    (0, common_1.Get)("name/:name"),
    __param(0, (0, common_1.Param)("name")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "getRoleByName", null);
__decorate([
    (0, role_decorator_1.Role)("admin"),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard, role_guard_1.RoleGuard),
    (0, common_1.Get)("id/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "getRoleById", null);
__decorate([
    (0, role_decorator_1.Role)("admin"),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard, role_guard_1.RoleGuard),
    (0, common_1.Delete)("id/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "deleteRoleById", null);
__decorate([
    (0, role_decorator_1.Role)("admin"),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard, role_guard_1.RoleGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "postRole", null);
__decorate([
    (0, role_decorator_1.Role)("admin"),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard, role_guard_1.RoleGuard),
    (0, common_1.Put)("id/:id"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "putRole", null);
RoleController = __decorate([
    (0, common_1.Controller)("api/v1/roles")
], RoleController);
exports.RoleController = RoleController;
//# sourceMappingURL=role.controller.js.map