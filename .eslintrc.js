module.exports = {
    'env': {
        'browser': true,
        'es2021': true,
        'node': true,
        'jest': true
    },
    'extends': [
        'plugin:react/recommended'
    ],
    'parserOptions': {
        'ecmaFeatures': {
            'jsx': true
        },
        'ecmaVersion': 12,
        'sourceType': 'module'
    },
    'plugins': [
        'react'
    ],
    'rules': {
        'indent': [
            'error',
            4
        ],
        'linebreak-style': [
            'error',
            'unix'
        ],
        'quotes': [
            'error',
            'single'
        ],
        'react/prop-types': [
            'off'
        ],
        'semi': [
            'error',
            'never'
        ]
    }
}
