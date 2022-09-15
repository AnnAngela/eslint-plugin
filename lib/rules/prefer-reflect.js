/**
 * @fileoverview Modern version of original "prefer-reflect" rules in eslint
 * @author AnnAngela
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
    meta: {
        type: "suggestion",

        docs: {
            description: "Modern version of original `prefer-reflect` rules in eslint",
            recommended: true,
            url: "https://eslint.org/docs/rules/prefer-reflect"
        },

        schema: [
            {
                type: "object",
                properties: {
                    exceptions: {
                        type: "array",
                        items: {
                            enum: [
                                "apply",
                                "defineProperty",
                                "deleteProperty",
                                "getOwnPropertyDescriptor",
                                "getPrototypeOf",
                                "has",
                                "isExtensible",
                                "ownKeys",
                                "preventExtensions",
                                "setPrototypeOf",
                            ]
                        },
                        uniqueItems: true
                    }
                },
                additionalProperties: false
            }
        ],

        messages: {
            preferReflect: "Avoid using {{existing}}, instead use {{substitute}}."
        }
    },

    create(context) {
        const existingNames = {
            apply: "Function.prototype.apply",
            call: "Function.prototype.call",
            defineProperty: "Object.defineProperty",
            getOwnPropertyDescriptor: "Object.getOwnPropertyDescriptor",
            getPrototypeOf: "Object.getPrototypeOf",
            isExtensible: "Object.isExtensible",
            getOwnPropertyNames: "Object.getOwnPropertyNames",
            preventExtensions: "Object.preventExtensions",
            setPrototypeOf: "Object.setPrototypeOf",
        };

        const reflectSubstitutes = {
            apply: "Reflect.apply",
            call: "Reflect.apply",
            defineProperty: "Reflect.defineProperty",
            getOwnPropertyDescriptor: "Reflect.getOwnPropertyDescriptor",
            getPrototypeOf: "Reflect.getPrototypeOf",
            isExtensible: "Reflect.isExtensible",
            getOwnPropertyNames: "Reflect.ownKeys",
            preventExtensions: "Reflect.preventExtensions",
            setPrototypeOf: "Reflect.setPrototypeOf",
        };

        const exceptions = (context.options[0] || {}).exceptions || [];

        /**
         * Reports the Reflect violation based on the `existing` and `substitute`
         * @param {Object} node The node that violates the rule.
         * @param {string} existing The existing method name that has been used.
         * @param {string} substitute The Reflect substitute that should be used.
         * @returns {void}
         */
        function report(node, existing, substitute) {
            context.report({
                node,
                messageId: "preferReflect",
                data: {
                    existing,
                    substitute
                },
            });
        }

        return {
            CallExpression(node) {
                const methodName = (node.callee.property || {}).name;
                const isReflectCall = (node.callee.object || {}).name === "Reflect";
                const hasReflectSubstitute = Reflect.has(reflectSubstitutes, methodName);
                const userConfiguredException = hasReflectSubstitute && exceptions.includes(reflectSubstitutes[methodName].replace(/^Reflect\./, ""));

                if (hasReflectSubstitute && !isReflectCall && !userConfiguredException) {
                    report(node, existingNames[methodName], reflectSubstitutes[methodName]);
                }
            },
            UnaryExpression(node) {
                const isDeleteOperator = node.operator === "delete";
                const targetsIdentifier = node.argument.type === "Identifier";
                const userConfiguredException = exceptions.includes("deleteProperty");

                if (isDeleteOperator && !targetsIdentifier && !userConfiguredException) {
                    report(node, "the delete keyword", "Reflect.deleteProperty");
                }
            },
            BinaryExpression(node) {
                const isInOperator = node.operator === "in";
                const userConfiguredException = exceptions.includes("has");

                if (isInOperator && !userConfiguredException) {
                    report(node, "the in keyword", "Reflect.has");
                }
            }
        };

    }
};