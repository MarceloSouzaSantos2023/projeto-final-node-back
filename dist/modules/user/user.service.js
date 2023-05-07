"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/modules/user/user.service.ts
var user_service_exports = {};
__export(user_service_exports, {
  createUser: () => createUser,
  findUserByEmail: () => findUserByEmail,
  findUsers: () => findUsers,
  removeUserByEmail: () => removeUserByEmail,
  updateUser: () => updateUser
});
module.exports = __toCommonJS(user_service_exports);

// src/utils/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();
var prisma_default = prisma;

// src/utils/hash.ts
var import_crypto = __toESM(require("crypto"));
function hashPassword(password) {
  const salt = import_crypto.default.randomBytes(16).toString("hex");
  const hash = import_crypto.default.pbkdf2Sync(password, salt, 1e3, 64, "sha512").toString("hex");
  return { hash, salt };
}

// src/modules/user/user.service.ts
async function findUsers() {
  return prisma_default.user.findMany({ select: { email: true, name: true, id: true } });
}
async function findUserByEmail(email) {
  return await prisma_default.user.findUnique({ where: { email } });
}
async function createUser(input) {
  const { password, ...rest } = input;
  const { hash, salt } = hashPassword(password);
  const user = await prisma_default.user.create({ data: { ...rest, salt, password: hash } });
  return user;
}
async function updateUser(email, user) {
  return await prisma_default.user.update({ where: { email }, data: user });
}
async function removeUserByEmail(email) {
  return await prisma_default.user.delete({ where: { email } });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createUser,
  findUserByEmail,
  findUsers,
  removeUserByEmail,
  updateUser
});