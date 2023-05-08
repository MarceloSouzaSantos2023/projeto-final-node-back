export declare class AuthService {
    private readonly jwtService;
    private readonly userService;
    private readonly roleService;
    login(username: string, password: string): Promise<string>;
    validateCredentials(username: string, password: string): Promise<any>;
}
