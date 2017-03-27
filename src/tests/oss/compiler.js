function tokenizer(input) {
  let cursor = 0;
  const tokens = [];

  const regMap = {
    WHITE_SPACE: /\s/,
    DIGIT: /\d/,
    ID: /\w/i,
    PAREN: /\(|\)/,
    COMMA: /\,/,
    SEMI_COMMA: /\;/
  };

  while (cursor < input.length) {
    let current = input[cursor];
    
    if (regMap.PAREN.test(current)) {
      tokens.push({
        type: 'PAREN',
        value: current
      });

      cursor++;
      continue;
    }

    if (regMap.WHITE_SPACE.test(current)) {
      cursor++;
      continue;
    }

    if (regMap.DIGIT.test(current)) {
      let value = '';
      let index = cursor;
      let c = input[index];
      while (cursor < input.length && regMap.DIGIT.test(c)) {
        value += c;
        c = input[++index];
      }

      tokens.push({
        type: 'NUMBER',
        value: value
      });
      cursor += value.length;
      continue;
    }

    if (regMap.ID.test(current)) {
      let value = '';
      let index = cursor;
      let c = input[index];
      while (cursor < input.length && regMap.ID.test(c)) {
        value += c;
        c = input[++index];
      }

      tokens.push({
        type: 'ID',
        value: value
      });
      cursor += value.length;
      continue;
    }

    if (regMap.COMMA.test(current)) {
      tokens.push({
        type: 'COMMA',
        value: ','
      });
      cursor++;
      continue;
    }

    if (regMap.SEMI_COMMA.test(current)) {
      tokens.push({
        type: 'SEMI_COMMA',
        value: ';'
      });
      cursor++;
      continue;
    }

    throw new TypeError('Unsupported character here: ' + current);
  }

  return tokens;
}

// 词法解析器
function parser(tokens) {
  let cursor = 0;

  function walk() {
    let token = tokens[cursor];

    if (token.type === 'NUMBER') {
      let node = {
        type: 'NumberLiteral',
        value: token.value
      };

      cursor++;
      return node;
    }

    if (token.type === 'PAREN' && token.value === '(') {

      token = tokens[++cursor];

      let node = {
        type: 'CallExpression',
        name: token.value,
        params: []
      };

      token = tokens[++cursor];

      while (token.type !== 'PAREN' || (token.type === 'PAREN' && token.value !== ')')) {
        node.params.push(walk());
        token = tokens[cursor];
      }

      cursor++;
      return node;
    }

    if (token.type === 'COMMA' || token.type === 'SEMI_COMMA' || token.type === 'ID') {
      cursor++;

      return {
        type: token.type,
        value: token.value
      };
    }

    throw new Error(token.type);
  }

  let ast = {
    type: 'Program',
    body: []
  };

  while (cursor < tokens.length) {
    ast.body.push(walk());
  }

  return ast;
}

function traverser(ast, visitor) {
  
  function traverseArray(array, parent) {
    array.map(function(child) {
      traverseNode(child, parent);
    });
  }

  function traverseNode(node, parent) {
    const method = visitor[node.type];

    if (method) {
      method(node, parent);
    }

    switch (node.type) {
      case 'Program':
        traverseArray(node.body, node);
        break;
      case 'CallExpression':
        traverseArray(node.params, node);
        break;
      case 'NumberLiteral':
      case 'ID':
      case 'COMMA':
      case 'SEMI_COMMA':
        break;
      default:
        throw new Error(node.type);
    }
  }

  traverseNode(ast, null);
}


function transformer(ast) {
  let newAst = {
    type: 'Program',
    body: []
  };

  ast._context = newAst.body;

  traverser(ast, {
    'NumberLiteral': function(node, parent) {
      parent._context.push({
        type: 'NumberLiteral',
        value: node.value
      });
    },
    'CallExpression': function (node, parent) {
      let expression = {
        type: 'CallExpression',
        callee: {
          type: 'Identifier',
          name: node.name
        },
        arguments: []
      };

      node._context = expression.arguments;

      if (parent.type !== 'CallExpression') {
        expression = {
          type: 'ExpressionStatement',
          expression: expression
        };
      }

      parent._context.push(expression);
    }
  })

  return newAst;
}

function codeGenerator(node) {
  switch (node.type) {
    case 'Program':
    return node.body.map(codeGenerator).join('\n');

    case 'ExpressionStatement':
      return codeGenerator(node.expression) + ';';

    case 'CallExpression':
    return codeGenerator(node.callee) + '<b class="paren">(</b>' + node.arguments.map(codeGenerator).join(', ') + '<b class="paren">)</b>';

    case 'Identifier':
      return '<span class="fn">' + node.name + '</span>';

    case 'NumberLiteral':
      return node.value;

    default:
      throw new TypeError(node.type);
  }
}

function compiler(input) {
  const tokens = tokenizer(input);
  const ast = parser(tokens);
  const newAst = transformer(ast);
  const output = codeGenerator(newAst);
  return output;
}

function fns() {
  var fn = [];
  fn.push('function add(x, y){return x + y;}');
  fn.push('function sub(x, y){return x - y;}');
  fn.push('function mul(x, y){return x * y;}');
  fn.push('function div(x, y){return x / y;}');
  fn.push('function pow(x, y){return Math.pow(x, y);}');
  return fn;
}

function tpls() {
  var tpl = [];

  tpl.push('<style type="text/css">');
  tpl.push('.fn{color: #222;font-weight:bold;font-size: 14px;margin-left: 5px;cursor: pointer;}');
  tpl.push('.paren{color:blue;font-size:16px;}');
  tpl.push('</style>');

  return tpl;
}

function main() {
  const str = [
    "(div 40 (mul 2 (add 40 (sub 4 5))))"
  ];

  str.map(function(item) {
    let tokens = tokenizer(item);
    let ast = parser(tokens);
    let newAst = transformer(ast);
    let output = codeGenerator(newAst);

    output = '<!Doctype><html><body>' + tpls().join('') + output + '</body></html>';
    console.log(output)
  });
}

main();

module.exports = {
  tokenizer: tokenizer,
  parser: parser,
  transformer: transformer,
  codeGenerator: codeGenerator,
  compiler: compiler
};