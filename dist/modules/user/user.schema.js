"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/modules/user/user.schema.ts
var user_schema_exports = {};
__export(user_schema_exports, {
  $ref: () => $ref,
  userSchemas: () => userSchemas
});
module.exports = __toCommonJS(user_schema_exports);
var import_zod = require("zod");
var import_fastify_zod = require("fastify-zod");
var userCore = {
  email: import_zod.z.string({
    required_error: "Email is required",
    invalid_type_error: "Email must be a string"
  }).email(),
  name: import_zod.z.string()
};
var createUserSchema = import_zod.z.object({
  ...userCore,
  password: import_zod.z.string({
    required_error: "Password is required",
    invalid_type_error: "Password must be a string"
  })
});
var createUserResponseSchema = import_zod.z.object({
  id: import_zod.z.number(),
  ...userCore
});
var updateUserSchema = import_zod.z.object({
  id: import_zod.z.number(),
  ...userCore,
  password: import_zod.z.string({
    required_error: "Password is required",
    invalid_type_error: "Password must be a string"
  })
});
var findeUserSchema = import_zod.z.object({
  email: import_zod.z.string({
    required_error: "Email is required",
    invalid_type_error: "Email must be a string"
  }).email()
});
var { schemas: userSchemas, $ref } = (0, import_fastify_zod.buildJsonSchemas)({
  createUserSchema,
  updateUserSchema,
  createUserResponseSchema,
  findeUserSchema
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  $ref,
  userSchemas
});
