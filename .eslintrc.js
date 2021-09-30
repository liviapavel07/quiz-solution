module.exports = {
    'env': {
        'browser': true,
        'es6': true,
        'node': true
    },
    'extends': 'eslint:recommended',
    'globals': {
        'Atomics': 'readonly',
        'SharedArrayBuffer': 'readonly'
    },
    'parser': 'babel-eslint',
    'parserOptions': {
        'ecmaFeatures': {
            'jsx': true
        },
        'ecmaVersion': 2018,
        'sourceType': 'module'
    },
    'plugins': ['react'],
    'rules': {
        'quotes': ['error', 'single'],
        'semi': ['error', 'always'],
        'arrow-spacing': ['error', { 'before': true, 'after': true }],
        'space-before-function-paren': ['error', {'anonymous': 'never', 'named': 'never', 'asyncArrow': 'always'}],
        'comma-dangle': ['error', 'never'],
        'block-spacing': 'error',
        'no-debugger': 'error',
        'no-useless-escape': 0,
        'no-console': 0,
        'no-unused-vars': 0
    }
};
