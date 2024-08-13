"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return processTailwindFeatures;
    }
});
const _normalizeTailwindDirectives = /*#__PURE__*/ _interop_require_default(require("./lib/normalizeTailwindDirectives"));
const _expandTailwindAtRules = /*#__PURE__*/ _interop_require_default(require("./lib/expandTailwindAtRules"));
const _expandApplyAtRules = /*#__PURE__*/ _interop_require_default(require("./lib/expandApplyAtRules"));
const _evaluateTailwindFunctions = /*#__PURE__*/ _interop_require_default(require("./lib/evaluateTailwindFunctions"));
const _substituteScreenAtRules = /*#__PURE__*/ _interop_require_default(require("./lib/substituteScreenAtRules"));
const _resolveDefaultsAtRules = /*#__PURE__*/ _interop_require_default(require("./lib/resolveDefaultsAtRules"));
const _collapseAdjacentRules = /*#__PURE__*/ _interop_require_default(require("./lib/collapseAdjacentRules"));
const _collapseDuplicateDeclarations = /*#__PURE__*/ _interop_require_default(require("./lib/collapseDuplicateDeclarations"));
const _partitionApplyAtRules = /*#__PURE__*/ _interop_require_default(require("./lib/partitionApplyAtRules"));
const _setupContextUtils = require("./lib/setupContextUtils");
const _featureFlags = require("./featureFlags");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function processTailwindFeatures(setupContext) {
    return async function(root, result) {
        let { tailwindDirectives , applyDirectives  } = (0, _normalizeTailwindDirectives.default)(root);
        // Partition apply rules that are found in the css
        // itself.
        (0, _partitionApplyAtRules.default)()(root, result);
        let context = setupContext({
            tailwindDirectives,
            applyDirectives,
            registerDependency (dependency) {
                result.messages.push({
                    plugin: "tailwindcss",
                    parent: result.opts.from,
                    ...dependency
                });
            },
            createContext (tailwindConfig, changedContent) {
                return (0, _setupContextUtils.createContext)(tailwindConfig, changedContent, root);
            }
        })(root, result);
        if (context.tailwindConfig.separator === "-") {
            throw new Error("The '-' character cannot be used as a custom separator in JIT mode due to parsing ambiguity. Please use another character like '_' instead.");
        }
        (0, _featureFlags.issueFlagNotices)(context.tailwindConfig);
        await (0, _expandTailwindAtRules.default)(context)(root, result);
        // Partition apply rules that are generated by
        // addComponents, addUtilities and so on.
        (0, _partitionApplyAtRules.default)()(root, result);
        (0, _expandApplyAtRules.default)(context)(root, result);
        (0, _evaluateTailwindFunctions.default)(context)(root, result);
        (0, _substituteScreenAtRules.default)(context)(root, result);
        (0, _resolveDefaultsAtRules.default)(context)(root, result);
        (0, _collapseAdjacentRules.default)(context)(root, result);
        (0, _collapseDuplicateDeclarations.default)(context)(root, result);
    };
}
