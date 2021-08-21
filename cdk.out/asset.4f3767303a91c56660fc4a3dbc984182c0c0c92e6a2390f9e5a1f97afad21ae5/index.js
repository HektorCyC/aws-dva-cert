var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};

// api/getDocuments/index.ts
__export(exports, {
  getDocuments: () => getDocuments
});
var import_s3 = __toModule(require("aws-sdk/clients/s3"));
var s3 = new import_s3.default();
var bucketName = process.env.DOCUMENTS_BUCKET_NAME;
var getDocuments = async (event, context) => {
  console.log("Bucket Name: ", bucketName);
  try {
    const { Contents: results } = await s3.listObjects({ Bucket: bucketName }).promise();
    const documents = await Promise.all(results.map(async (result) => generateSignedURL(result)));
    return {
      statusCode: 200,
      body: JSON.stringify(documents)
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: err.message
    };
  }
};
var generateSignedURL = async (object) => {
  const url = await s3.getSignedUrlPromise("getObject", {
    Bucket: bucketName,
    Key: object.Key,
    Expires: 60 * 60
  });
  return {
    filename: object.Key,
    url
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getDocuments
});
