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
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));

// src/index.ts
var index_exports = {};
__export(index_exports, {
  CauldronUI: () => CauldronUI
});

// src/types/index.ts
var types_exports = {};
__reExport(types_exports, antd_star);
import * as antd_star from "antd";

// src/index.ts
__reExport(index_exports, types_exports);
var CauldronUI = {
  version: "0.1.0",
  name: "CauldronOS UI"
};
export {
  CauldronUI
};
//# sourceMappingURL=index.mjs.map