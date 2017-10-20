# Snapshot report for `test/plugin.spec.js`

The actual snapshot is saved in `plugin.spec.js.snap`.

Generated by [AVA](https://ava.li).

## transforms an HTML import to an inline Nearley grammar

> Snapshot 1

    `'use strict';␊
    ␊
    var foo = function () {␊
        var id = function id(data) {␊
            return data[0];␊
        };␊
    ␊
        return {␊
            Lexer: undefined,␊
            ParserStart: "digit",␊
            ParserRules: [{␊
                "name": "digit",␊
                "symbols": [/[0-9]/],␊
                "postprocess": id␊
            }]␊
        };␊
    }();

## allows whitelisting files that should be inlined

> Snapshot 1

    `'use strict';␊
    ␊
    var _bar = require('./fixtures/bar.ne');␊
    ␊
    var _bar2 = _interopRequireDefault(_bar);␊
    ␊
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }␊
    ␊
    var foo = function () {␊
        var id = function id(data) {␊
            return data[0];␊
        };␊
    ␊
        return {␊
            Lexer: undefined,␊
            ParserStart: "digit",␊
            ParserRules: [{␊
                "name": "digit",␊
                "symbols": [/[0-9]/],␊
                "postprocess": id␊
            }]␊
        };␊
    }();`

## transforms an Nearley import to an inline Nearley grammar

> Snapshot 1

    `'use strict';␊
    ␊
    var foo = function () {␊
        var id = function id(data) {␊
            return data[0];␊
        };␊
    ␊
        return {␊
            Lexer: undefined,␊
            ParserStart: "digit",␊
            ParserRules: [{␊
                "name": "digit",␊
                "symbols": [/[0-9]/],␊
                "postprocess": id␊
            }]␊
        };␊
    }();`