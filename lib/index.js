/**
 * @fileoverview Modern version of original `prefer-reflect` rules in eslint
 * @author AnnAngela
 */
"use strict";

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------


// import all rules in lib/rules
module.exports = {
    rules: {
        "@annangela/prefer-reflect": require("./rules/prefer-reflect.js"),
    }
}



