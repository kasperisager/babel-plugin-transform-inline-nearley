import fs from 'fs';
import path from 'path';
import template from 'babel-template';
import {isMatch} from 'micromatch';
import {Parser} from 'nearley/lib/nearley';
import compile from 'nearley/lib/compile';
import grammar from 'nearley/lib/nearley-language-bootstrapped';

const BUILTINS = {
  joiner: `
    function joiner(d) {
      return d.join('');
    }
  `,
  arrconcat: `
    function arrconcat(d) {
      return [d[0]].concat(d[1]);
    }
  `,
  arrpush: `
    function arrpush(d) {
      return d[0].concat([d[1]]);
    }
  `,
  nuller: `
    function nuller(d) {
      return null;
    }
  `,
  id: 'id'
};

function serializeRules(rules) {
  return `[
    ${rules.map(rule => serializeRule(rule)).join(',')}
  ]`;
}

function serializeRule(rule) {
  let {name, symbols, postprocess} = rule;

  if (postprocess && postprocess.builtin) {
    postprocess = BUILTINS[postprocess.builtin];
  }

  return `{
    name: ${JSON.stringify(name)},
    symbols: [${symbols.map(serializeSymbol).join(',')}]
    ${postprocess ? ', postprocess: ' + postprocess : ''}
  }`;
}

function serializeSymbol(symbol) {
  if (symbol instanceof RegExp) {
    return symbol.toString();
  }

  if (symbol.token) {
    return symbol.token;
  }

  return JSON.stringify(symbol);
}

export default function () {
  return {
    visitor: {
      ImportDeclaration(link, state) {
        const {
          include = '*.ne'
        } = state.opts;

        const node = link.node;
        const source = node.source.value;

        if (!isMatch(source, include, {matchBase: true})) {
          return;
        }

        const directory = path.dirname(path.resolve(state.file.opts.filename));
        const file = path.resolve(directory, source);
        let input;

        try {
          input = fs.readFileSync(file, 'utf8');
        } catch (err) {
          throw link.buildCodeFrameError('Imported file could not be found');
        }

        const parser = new Parser(grammar.ParserRules, grammar.ParserStart);
        parser.feed(input);

        const compiled = compile(parser.results[0], {});

        const {name} = node.specifiers[0].local;

        link.replaceWith(template(`
          var ${name} = (function () {
            function id(d) {
              return d[0];
            }
            ${compiled.body.join('\n')}
            return {
              Lexer: ${compiled.config.lexer},
              ParserStart: ${JSON.stringify(compiled.start)},
              ParserRules: ${serializeRules(compiled.rules)}
            };
          })();
        `)());
      }
    }
  };
}
