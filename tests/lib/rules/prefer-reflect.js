/**
 * @fileoverview Modern version of original &#34;prefer-reflect&#34; rules in eslint
 * @author AnnAngela
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/prefer-reflect"),
    { RuleTester } = require("eslint");


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();

ruleTester.run("prefer-reflect", rule, {
    valid: [

        // Reflect.apply
        "Reflect.apply(function(){}, null, 1, 2);",
        { code: "Reflect.apply(function(){}, null, 1, 2);", options: [{ exceptions: ["apply"] }] },
        { code: "(function(){}).apply(null, [1, 2]);", options: [{ exceptions: ["apply"] }] },
        { code: "(function(){}).call(null, 1, 2);", options: [{ exceptions: ["apply"] }] },

        // Reflect.defineProperty
        "Reflect.defineProperty({}, 'foo', {value: 1})",
        { code: "Reflect.defineProperty({}, 'foo', {value: 1})", options: [{ exceptions: ["defineProperty"] }] },
        { code: "Object.defineProperty({}, 'foo', {value: 1})", options: [{ exceptions: ["defineProperty"] }] },

        // Reflect.deleteProperty
        "Reflect.deleteProperty({}, 'foo');",
        "delete foo;",
        { code: "delete ({}).foo", options: [{ exceptions: ["deleteProperty"] }] },

        // Reflect.getOwnPropertyDescriptor
        "Reflect.getOwnPropertyDescriptor({}, 'foo');",
        { code: "Reflect.getOwnPropertyDescriptor({}, 'foo');", options: [{ exceptions: ["getOwnPropertyDescriptor"] }] },
        { code: "Object.getOwnPropertyDescriptor({}, 'foo');", options: [{ exceptions: ["getOwnPropertyDescriptor"] }] },

        // Reflect.getPrototypeOf
        "Reflect.getPrototypeOf({});",
        { code: "Reflect.getPrototypeOf({});", options: [{ exceptions: ["getPrototypeOf"] }] },
        { code: "Object.getPrototypeOf({});", options: [{ exceptions: ["getPrototypeOf"] }] },

        // Reflect.has
        "Reflect.has({}, 'foo');",
        { code: "'foo' in {};", options: [{ exceptions: ["has"] }] },

        // Reflect.setPrototypeOf
        "Reflect.setPrototypeOf({}, Object.prototype);",
        { code: "Reflect.setPrototypeOf({}, Object.prototype);", options: [{ exceptions: ["setPrototypeOf"] }] },
        { code: "Object.setPrototypeOf({}, Object.prototype);", options: [{ exceptions: ["setPrototypeOf"] }] },

        // Reflect.isExtensible
        "Reflect.isExtensible({});",
        { code: "Reflect.isExtensible({});", options: [{ exceptions: ["isExtensible"] }] },
        { code: "Object.isExtensible({});", options: [{ exceptions: ["isExtensible"] }] },

        // Reflect.getOwnPropertyNames
        "Reflect.getOwnPropertyNames({});",
        { code: "Reflect.getOwnPropertyNames({});", options: [{ exceptions: ["ownKeys"] }] },
        { code: "Object.getOwnPropertyNames({});", options: [{ exceptions: ["ownKeys"] }] },

        // Reflect.getOwnPropertyNames
        "Reflect.preventExtensions({});",
        { code: "Reflect.preventExtensions({});", options: [{ exceptions: ["preventExtensions"] }] },
        { code: "Object.preventExtensions({});", options: [{ exceptions: ["preventExtensions"] }] },
    ],
    invalid: [

        {
            code: "(function(){}).apply(null, [1, 2])",
            errors: [
                {
                    messageId: "preferReflect",
                    data: { existing: "Function.prototype.apply", substitute: "Reflect.apply" },
                    type: "CallExpression"
                }
            ]
        },
        {
            code: "(function(){}).apply(null, [1, 2])",
            options: [{ exceptions: ["defineProperty"] }],
            errors: [
                {
                    messageId: "preferReflect",
                    data: { existing: "Function.prototype.apply", substitute: "Reflect.apply" },
                    type: "CallExpression"
                }
            ]
        },
        {
            code: "(function(){}).call(null, 1, 2)",
            errors: [
                {
                    messageId: "preferReflect",
                    data: { existing: "Function.prototype.call", substitute: "Reflect.apply" },
                    type: "CallExpression"
                }
            ]
        },
        {
            code: "(function(){}).call(null, 1, 2)",
            options: [{ exceptions: ["defineProperty"] }],
            errors: [
                {
                    messageId: "preferReflect",
                    data: { existing: "Function.prototype.call", substitute: "Reflect.apply" },
                    type: "CallExpression"
                }
            ]
        },
        {
            code: "Object.defineProperty({}, 'foo', { value: 1 })",
            errors: [
                {
                    messageId: "preferReflect",
                    data: { existing: "Object.defineProperty", substitute: "Reflect.defineProperty" },
                    type: "CallExpression"
                }
            ]
        },
        {
            code: "Object.defineProperty({}, 'foo', { value: 1 })",
            options: [{ exceptions: ["apply"] }],
            errors: [
                {
                    messageId: "preferReflect",
                    data: { existing: "Object.defineProperty", substitute: "Reflect.defineProperty" },
                    type: "CallExpression"
                }
            ]
        },
        {
            code: "Object.getOwnPropertyDescriptor({}, 'foo')",
            errors: [
                {
                    messageId: "preferReflect",
                    data: { existing: "Object.getOwnPropertyDescriptor", substitute: "Reflect.getOwnPropertyDescriptor" },
                    type: "CallExpression"
                }
            ]
        },
        {
            code: "Object.getOwnPropertyDescriptor({}, 'foo')",
            options: [{ exceptions: ["apply"] }],
            errors: [
                {
                    messageId: "preferReflect",
                    data: { existing: "Object.getOwnPropertyDescriptor", substitute: "Reflect.getOwnPropertyDescriptor" },
                    type: "CallExpression"
                }
            ]
        },
        {
            code: "Object.getPrototypeOf({})",
            errors: [
                {
                    messageId: "preferReflect",
                    data: { existing: "Object.getPrototypeOf", substitute: "Reflect.getPrototypeOf" },
                    type: "CallExpression"
                }
            ]
        },
        {
            code: "Object.getPrototypeOf({})",
            options: [{ exceptions: ["apply"] }],
            errors: [
                {
                    messageId: "preferReflect",
                    data: { existing: "Object.getPrototypeOf", substitute: "Reflect.getPrototypeOf" },
                    type: "CallExpression"
                }
            ]
        },
        {
            code: "Object.setPrototypeOf({}, Object.prototype)",
            errors: [
                {
                    messageId: "preferReflect",
                    data: { existing: "Object.setPrototypeOf", substitute: "Reflect.setPrototypeOf" },
                    type: "CallExpression"
                }
            ]
        },
        {
            code: "Object.setPrototypeOf({}, Object.prototype)",
            options: [{ exceptions: ["apply"] }],
            errors: [
                {
                    messageId: "preferReflect",
                    data: { existing: "Object.setPrototypeOf", substitute: "Reflect.setPrototypeOf" },
                    type: "CallExpression"
                }
            ]
        },
        {
            code: "Object.isExtensible({})",
            errors: [
                {
                    messageId: "preferReflect",
                    data: { existing: "Object.isExtensible", substitute: "Reflect.isExtensible" },
                    type: "CallExpression"
                }
            ]
        },
        {
            code: "Object.isExtensible({})",
            options: [{ exceptions: ["apply"] }],
            errors: [
                {
                    messageId: "preferReflect",
                    data: { existing: "Object.isExtensible", substitute: "Reflect.isExtensible" },
                    type: "CallExpression"
                }
            ]
        },
        {
            code: "Object.getOwnPropertyNames({})",
            errors: [
                {
                    messageId: "preferReflect",
                    data: { existing: "Object.getOwnPropertyNames", substitute: "Reflect.ownKeys" },
                    type: "CallExpression"
                }
            ]
        },
        {
            code: "Object.getOwnPropertyNames({})",
            options: [{ exceptions: ["apply"] }],
            errors: [
                {
                    messageId: "preferReflect",
                    data: { existing: "Object.getOwnPropertyNames", substitute: "Reflect.ownKeys" },
                    type: "CallExpression"
                }
            ]
        },
        {
            code: "Object.preventExtensions({})",
            errors: [
                {
                    messageId: "preferReflect",
                    data: { existing: "Object.preventExtensions", substitute: "Reflect.preventExtensions" },
                    type: "CallExpression"
                }
            ]
        },
        {
            code: "Object.preventExtensions({})",
            options: [{ exceptions: ["apply"] }],
            errors: [
                {
                    messageId: "preferReflect",
                    data: { existing: "Object.preventExtensions", substitute: "Reflect.preventExtensions" },
                    type: "CallExpression"
                }
            ]
        },
        {
            code: "delete ({}).foo",
            errors: [
                {
                    messageId: "preferReflect",
                    data: { existing: "the delete keyword", substitute: "Reflect.deleteProperty" },
                    type: "UnaryExpression"
                }
            ]
        },
        {
            code: "delete ({}).foo",
            options: [{ exceptions: ["apply"] }],
            errors: [
                {
                    messageId: "preferReflect",
                    data: { existing: "the delete keyword", substitute: "Reflect.deleteProperty" },
                    type: "UnaryExpression"
                }
            ]
        },
        {
            code: "foo in {}",
            errors: [
                {
                    messageId: "preferReflect",
                    data: { existing: "the in keyword", substitute: "Reflect.has" },
                    type: "BinaryExpression"
                }
            ]
        },
        {
            code: "foo in {}",
            options: [{ exceptions: ["apply"] }],
            errors: [
                {
                    messageId: "preferReflect",
                    data: { existing: "the in keyword", substitute: "Reflect.has" },
                    type: "BinaryExpression"
                }
            ]
        }
    ]
});