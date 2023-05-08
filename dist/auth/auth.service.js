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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const user_service_1 = require("../user/user.service");
const role_service_1 = require("../role/role.service");
let AuthService = class AuthService {
    async login(username, password) {
        const user = await this.validateCredentials(username, password);
        const payload = {
            sub: user.id,
            username: user.username,
            role: user.role
        };
        return this.jwtService.sign(payload);
    }
    async validateCredentials(username, password) {
        var _a, _b, _c;
        const userRequest = await this.userService.findUserByEmail({ email: username });
        let roleRequest = null;
        if ((_a = userRequest === null || userRequest === void 0 ? void 0 : userRequest.user) === null || _a === void 0 ? void 0 : _a.roleId) {
            roleRequest = await this.roleService.findRoleById({ id: (_b = userRequest === null || userRequest === void 0 ? void 0 : userRequest.user) === null || _b === void 0 ? void 0 : _b.roleId });
        }
        if (!(userRequest === null || userRequest === void 0 ? void 0 : userRequest.user)) {
            throw new Error("User not found");
        }
        (_c = userRequest === null || userRequest === void 0 ? void 0 : userRequest.user) === null || _c === void 0 ? true : delete _c.roleId;
        let user = userRequest === null || userRequest === void 0 ? void 0 : userRequest.user;
        user.role = (roleRequest === null || roleRequest === void 0 ? void 0 : roleRequest.role) ? roleRequest === null || roleRequest === void 0 ? void 0 : roleRequest.role : null;
        return user;
    }
};
__decorate([
    (0, common_1.Inject)(jwt_1.JwtService),
    __metadata("design:type", jwt_1.JwtService)
], AuthService.prototype, "jwtService", void 0);
__decorate([
    (0, common_1.Inject)(user_service_1.UserService),
    __metadata("design:type", user_service_1.UserService)
], AuthService.prototype, "userService", void 0);
__decorate([
    (0, common_1.Inject)(role_service_1.RoleService),
    __metadata("design:type", role_service_1.RoleService)
], AuthService.prototype, "roleService", void 0);
AuthService = __decorate([
    (0, common_1.Injectable)()
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map